const express = require("express");
const router = express.Router();
const {
  loginUserGet,
  loginUserPost,
  refresGet,
} = require("../controllers/login");
router.route("/refresh").get(refresGet);
router.route("/").get(loginUserGet);
router.route("/").post(loginUserPost);
module.exports = router;
