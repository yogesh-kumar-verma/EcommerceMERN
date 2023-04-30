const dotenv = require("dotenv");
dotenv.config();
if (process.env.ISSQL) {
  var {
    productWithLimitsAndSkips,
  } = require("../services/sqlservices/productSqlServices");
  var {
    getUserByMailToken,
    updateUserWithToken,
  } = require("../services/sqlservices/userSqlServices");
} else {
  var {
    productWithLimitsAndSkips,
  } = require("../services/productMongoServices");
  var {
    getUserByMailToken,
    updateUserWithToken,
  } = require("../services/userMongoServices");
}

const veriyTokenGet = async (req, res) => {
  const { token } = req.params;

  let user = await getUserByMailToken(token);

  if (user !== null) {
    await updateUserWithToken(token);

    req.session.user = user;
    req.session.is_logged_in = true;
    req.session.user.isVerified = true;
  }

  res.redirect("/home");
};

// making a get request for home if no sesssion is present redirect to login page
const homeGet = async (req, res) => {
  let name = null;
  let isSeller = false;
  let page = 1;
  let limit = 8;
  let skip = (page - 1) * limit;

  let products = await productWithLimitsAndSkips(skip, limit);

  // if (req.session.is_logged_in) {
  //   name = req.session.name;
  //   isSeller = req.session.user.role;
  // }
  // res.render("home.ejs", { name, products, page, isSeller });
  res.json(products);
};
const mainHomeGet = async (req, res) => {
  let name = req.session.name;
  let isSeller = req.session.user.role;
  let page = 1;
  let limit = 8;
  let skip = (page - 1) * limit;
  let products = await productWithLimitsAndSkips(skip, limit);
  // console.log(products);
  // res.render("home.ejs", { name, products, page, isSeller });
  res.json(products);
};

const fetchAllGet = async (req, res) => {
  let name = req.user.name;

  const page = req.params.page;
  let limit = 8;
  let skip = (page - 1) * limit;
  let products = await productWithLimitsAndSkips(skip, limit);
  let isSeller = false;
  if (req.user.is_logged_in) {
    name = req.user.name;
    isSeller = req.user.user.role;
  }
  res.json(products);
  // res.render("home.ejs", { name, products, page, isSeller });
};
const getUserGet = (req, res) => {
  res.status(200).json(req.user);
};

module.exports = {
  veriyTokenGet,
  fetchAllGet,
  mainHomeGet,
  homeGet,
  getUserGet,
};
