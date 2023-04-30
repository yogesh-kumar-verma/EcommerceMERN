const dotenv = require("dotenv");
dotenv.config();
const Razorpay = require("razorpay");
var instance = new Razorpay({
  key_id: process.env.rayzorkey,
  key_secret: process.env.rayzorsecret,
});

const paymentPost = (req, res) => {
  console.log("yaha par hai banda");
  let { amount } = req.body;

  var options = {
    amount: amount * 10, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  instance.orders.create(options, function (err, order) {
    console.log(err, "error");
    res.json({ orderId: order.id });
  });
};
const payVerify = async (req, res) => {
  // console.log("pay verifiye pay hai");
  let body =
    req.body.response.razorpay_order_id +
    "|" +
    req.body.response.razorpay_payment_id;

  var crypto = require("crypto");
  var expectedSignature = crypto
    .createHmac("sha256", process.env.rayzorsecret)
    .update(body.toString())
    .digest("hex");
  // console.log("sig received ", req.body.response.razorpay_signature);
  // console.log("sig generated ", expectedSignature);
  var response = { signatureIsValid: "false" };
  if (expectedSignature === req.body.response.razorpay_signature)
    response = { signatureIsValid: "true" };
  res.send(response);
};
module.exports = { paymentPost, payVerify };
