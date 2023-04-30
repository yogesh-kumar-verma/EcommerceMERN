const express = require("express");
const { getUser } = require("moongose/controller/user_controller");
const {
  veriyTokenGet,
  homeGet,
  mainHomeGet,
  fetchAllGet,
  getUserGet,
} = require("../controllers/home");

const router = express.Router();
const isAuth = require("../middleware/isAuth");
const isSeller = require("../middleware/isSeller");
router.route("/verifyEmail/:token").get(veriyTokenGet);
router.route("/home").get(homeGet);
router.route("/").get(isAuth, mainHomeGet);
router.route("/fetchAll/:page").get(isAuth, fetchAllGet);
router.route("/getuser").get(isAuth, getUserGet);

module.exports = router;
