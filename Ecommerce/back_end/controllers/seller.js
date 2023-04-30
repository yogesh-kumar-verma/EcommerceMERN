const ProductModal = require("../database/product");
const UserModal = require("../database/users");
const PlaceorderModal = require("../database/placeorder");
const dotenv = require("dotenv");
dotenv.config();

if (process.env.ISSQL) {
  var {
    getMyDeleviriesWithKeySellerBy_Id,
  } = require("../services/sqlservices/placeorderSqlServices");
  var {
    sellerProductWithLimitsAndSkips,
  } = require("../services/sqlservices/productSqlServices");
} else {
  var {
    getMyDeleviriesWithKeySellerBy_Id,
  } = require("../services/placeorderMongoServices");
  var {
    sellerProductWithLimitsAndSkips,
  } = require("../services/productMongoServices");
}
const addProductGet = async (req, res) => {
  // let user = await UserModal.findOne({ username: req.session.user.username });
  let page = 0;
  let limit = 8;
  if (req.params.page) {
    page = req.params.page;
  }
  let skip = page * 8;
  let products = await sellerProductWithLimitsAndSkips(
    // req.session.user._id,
    9,
    skip,
    limit
  );

  res.json(products);
};
const deliverProductGet = async (req, res) => {
  let placeorders = await getMyDeleviriesWithKeySellerBy_Id(req.user._id);
  res.json(placeorders);
  // res.render("mydeliveries.ejs", {
  //   deliveries: placeorders,
  //   name: req.session.user.name,
  //   isSeller: req.session.user.role,
  // });
};
module.exports = { addProductGet, deliverProductGet };
