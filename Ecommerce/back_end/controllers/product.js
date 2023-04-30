const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const { parse } = require("csv-parse");
if (process.env.ISSQL) {
  var {
    createCart,

    deleteCartBy_Id,
    updateCart,
    cartGetByIdWithCartitems,
  } = require("../services/sqlservices/cartSqlServices");
  var {
    getProductBy_Id,
    addNewProduct,
    deleteProductBy_Id,
    updateProductDetailsBy_Id,
    addProduct,
  } = require("../services/sqlservices/productSqlServices");
} else {
  var {
    cartGetByUsername,
    cartUpdateByUsername,
    createCart,
    cartGetByKeyUserWith_Id,
    cartUpdateBy_Id,
    deleteCartByItem,
    updateCart,
    cartGetByUsernameWithCartitems,
  } = require("../services/cartMongoServices");
  var {
    getProductBy_Id,
    addNewProduct,
    deleteProductBy_Id,
    updateProductDetailsBy_Id,
  } = require("../services/productMongoServices");
}
const productGet = async (req, res) => {
  const { id } = req.params;
  let product = await getProductBy_Id(id);

  res.render("item.ejs", {
    product: product,
    name: req.user.name,
    isSeller: req.user.role,
  });
  return;
};
const addcartmoreGet = async (req, res) => {
  const { id } = req.params;

  // let { _id } = req.user.user;
  let cart = await cartGetByIdWithCartitems(req.user._id);
  let quantity;
  cart.forEach(async (value) => {
    if (value._id == id) {
      value.quantity = value.quantity + 1;
      quantity = value.quantity;
      not_in_cart = false;
      await updateCart(value._id, quantity);
    }
  });
  res.json(quantity);
  // res.send(JSON.stringify(quantity));
};
const addcartGet = async (req, res) => {
  const { id } = req.params;
  // console.log("yah par hit ho rha hai");
  // res.send("added to cart");
  // return;

  // let { _id, username } = req.user.user;

  let cart = await cartGetByIdWithCartitems(req.user._id);
  let product = await getProductBy_Id(id);
  let quantity;

  if (cart !== undefined) {
    let not_in_cart = true;
    cart.forEach(async (value) => {
      if (value.product_id == id) {
        value.quantity = value.quantity;
        quantity = value.quantity;
        not_in_cart = false;
        await updateCart(value._id, quantity);
      }
    });
    if (not_in_cart) {
      // cart.cartitems.push(cartItem);

      await createCart(req.user._id, id, 1);

      quantity = 1;
    }

    res.json(true);
  } else {
    await createCart(req.user._id, id, 1);

    quantity = 1;
    res.json(true);
  }
  // res.send(JSON.stringify(quantity));
};

const minusGet = async (req, res) => {
  const { id } = req.params;

  // let { _id } = req.user.user;
  let quantity;
  let cart = await cartGetByIdWithCartitems(req.user._id);
 
  if (cart !== undefined) {
    cart.forEach(async (value) => {
      if (value._id == id) {
        value.quantity = value.quantity - 1;
        quantity = value.quantity;
        await updateCart(value._id, quantity);
      }
    });
  }
  res.send(JSON.stringify(quantity));
};
const deletecartGet = async (req, res) => {
  const { id } = req.params;
  // let { username } = req.user.user;
  let deltecart = await deleteCartBy_Id(id);

  res.json(true);
};
const productUpdatePost = async (req, res) => {
  let { id } = req.params;
  const { name, description, price, quantity } = req.body;
  if (price.isNaN() || quantity.isNaN()) {
    res.json("invalid quantity or price ");
  }
  let product = await updateProductDetailsBy_Id(
    id,
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.quantity
  );
  res.send(JSON.stringify("success"));
};
const productDeletePost = async (req, res) => {
  let { id } = req.params;

  let product = await deleteProductBy_Id(id);
  // res.redirect("/seller");
  res.json("deleted");
};
const addProductPost = async (req, res) => {
  if (!req.file) {
    res.end("please enter the valid files");
    res.redirect(req.baseUrl);
  }
  let data = JSON.parse(req.body.data);

  let product = await addNewProduct(
    req.user._id,
    data.name,
    data.desc,
    data.quantity,
    data.price,
    req.file.path
  );
  res.json("true");
  // res.redirect("/seller");
  // // res.send("added sucessfully");
};
const postcsvPost = async (req, res) => {
  console.log("csv file hai ye ", req.file);
  let path = req.file.path;
  fs.createReadStream(path)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", async function (row) {
      let product = await addProduct(
        req.user._id,
        row[0],
        row[1],
        row[2],
        row[3],
        row[4],
        row[5],
        row[6],
        row[7],
        row[8],
        row[9]
      );
    });

  res.json("sucessfully posted csv");
};
module.exports = {
  productGet,
  postcsvPost,
  addcartmoreGet,
  minusGet,
  addcartGet,
  deletecartGet,
  productUpdatePost,
  addProductPost,
  productDeletePost,
};
