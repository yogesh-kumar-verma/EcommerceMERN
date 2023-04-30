const dotenv = require("dotenv");
dotenv.config();
if (process.env.ISSQL) {
  var {
    cartGetByIdWithCartitems,
    cartGetByIdWithCartitemsWithQuantityLimit,
  } = require("../services/sqlservices/cartSqlServices");

  var {
    newOrderPlace,

    deletePlaceOrderBy_Id,

    getMyordersWithItemsBy_Id,
    confirmPlaceOrderBy_Id,
    updateStatus,
    updatePayId,
    refillTheCart,
    getMyPendingOrdersWithItemsBy_Id,
  } = require("../services/sqlservices/placeorderSqlServices");
} else {
  var {
    cartGetByIdWithCartitems,
    deleteCartBy_Id,
  } = require("../services/cartMongoServices");
  var {
    getProductBy_Id,
    updateProductWith_Id,
  } = require("../services/productMongoServices");
  var {
    newOrderPlace,

    deletePlaceOrderBy_Id,

    getMyordersWithItemsBy_Id,
  } = require("../services/placeorderMongoServices");
}
const placeOrderGet = async (req, res) => {
  let pendingorder = await getMyPendingOrdersWithItemsBy_Id(req.user._id);
  // console.log(req.user, "user");
  console.log(pendingorder, "pendingorder");

  res.json(pendingorder);
  return;
  // res.render("placeorder.ejs", {
  //   name: req.user.name,
  //   isSeller: req.user.role,
  //   cart: cart,
  // });
};
const placedOrderPost = async (req, res) => {
  let carts = await cartGetByIdWithCartitemsWithQuantityLimit(req.user._id);
  let a = carts.length;
  let { city, address, state, pincode } = req.body;
  // console.log("address ", city, address, state, pincode);
  // return;
  carts.forEach(async (cart) => {
    let placeorder = await newOrderPlace(
      res,
      address,
      city,
      state,
      pincode,
      req.user._id,
      cart
    );
  });
  res.json("sucess");
};
const placeOrderStatus = async (req, res) => {
  let { payid } = req.body;
  console.log(payid, "pay id ye hai");

  if (payid == "failed") {
    console.log(payid, "pay id ye hai");
    await updateStatus("failed", req.user._id);
    await refillTheCart(req.user._id);
    res.json("failed");
  } else {
    await updateStatus("Pay Success", req.user._id);

    console.log(payid, "pay id ye hai");
    await updatePayId(payid, req.user._id);
    res.json("sucess");
  }
};

const placedOrderGet = async (req, res) => {
  let placeorder = await getMyordersWithItemsBy_Id(9);

  res.json(placeorder);
};
const placedOrderDelete = async (req, res) => {
  let { _id } = req.params;

  let deleteorder = await deletePlaceOrderBy_Id(_id);
  res.redirect("/placeorder/myorders");
  return;
};
const placedOrderConfirm = async (req, res) => {
  let { _id } = req.params;

  let deleteorder = await confirmPlaceOrderBy_Id(_id);
  res.redirect("/placeorder/myorders");
  return;
};
module.exports = {
  placeOrderGet,
  placedOrderPost,
  placedOrderGet,
  placedOrderDelete,
  placedOrderConfirm,
  placeOrderStatus,
};
