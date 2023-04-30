const express = require("express");
const router = express.Router();
const { paymentPost, payVerify } = require("../controllers/payment");
const isAuth = require("../middleware/isAuth");

// router.route("/").get(loginUserGet);
router.route("/").post(isAuth, paymentPost);
router.route("/verify").post(isAuth, payVerify);
// app.post("/api/payment/",
module.exports = router;
