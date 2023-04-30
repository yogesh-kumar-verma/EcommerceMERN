const express = require("express");
const multer = require("multer");
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const fileSize = parseInt(req.headers["content-length"]);

    if (
      (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "application/octet-stream") &&
      fileSize <= 1282810
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).single("file");
const upload1 = multer({
  dest: "uploads/csv",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
  limits: { fileSize: 104857600 },
  fileFilter: (req, file, cb) => {
    const fileSize = parseInt(req.headers["content-length"]);
    file.mimetype === "text/csv" ? cb(null, true) : cb(null, false);
    if (fileSize <= 104857600) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).single("csvdata");
const router = express.Router();
const {
  productGet,
  addcartmoreGet,
  addcartGet,
  minusGet,

  productUpdatePost,
  addProductPost,
  productDeletePost,
  deletecartGet,
  postcsvPost,
} = require("../controllers/product");
const isAuth = require("../middleware/isAuth");
const isSeller = require("../middleware/isSeller");
router.route("/:id").get(isAuth, productGet);
router.route("/postcsv").post(upload1, isAuth, postcsvPost);
router.route("/updatedetails/:id").post(isAuth, isSeller, productUpdatePost);
router.route("/addproduct").post(upload, isAuth, isSeller, addProductPost);
router.route("/delete/:id").get(isAuth, isSeller, productDeletePost);
router.route("/addcart/:id").get(isAuth, addcartGet);
router.route("/addcart/add/:id").get(isAuth, addcartmoreGet);

router.route("/minuscart/:id").get(isAuth, minusGet);
router.route("/deletecart/:id").get(isAuth, deletecartGet);
module.exports = router;
