const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const jwt = require("jsonwebtoken");
if (process.env.ISSQL) {
  console.log("sql ke login mode on");
  var {
    getUserByUsername,
  } = require("../services/sqlservices/userSqlServices");
} else {
  console.log("mongoose ke login mode on");
  var { getUserByUsername } = require("../services/userMongoServices");
}
const refresGet = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    let error = "Unotherised";
    res.status(401).send(error);
    return;
  }
  if (
    user.username == req.body.username &&
    user.password == req.body.password
  ) {
    const accessToken = jwt.sign(
      { ...user, password: "" },
      process.env.ACCESS_KEY_TOKEN,
      { expiresIn: "1000s" }
    );
    const refreshToken = jwt.sign(
      { ...user, password: "" },
      process.env.REFRESH_KEY_TOKEN,
      { expiresIn: "1d" }
    );
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.json({ accessToken });
    // req.session.user = user;
    // req.session.isVerified = user.isVerified;

    // req.session.is_logged_in = true;
    // req.session.name = user.name;
    // res.json(true);
    return;
  }
};
const loginUserGet = (req, res) => {
  let name = null;
  let error = null;

  res.render("login.ejs", { name, error, isSeller: false });
  return;
};
const loginUserPost = async (req, res) => {
  let user = await getUserByUsername(req.body.username);
  // console.log(user);
  if (user == null || user.password !== req.body.password) {
    let name = null;
    let error = "Wrong Password Or Username";
    res.status(400).send(error);
    return;
  } else {
    if (
      user.username == req.body.username &&
      user.password == req.body.password
    ) {
      const accessToken = jwt.sign(
        { ...user, password: "" },
        process.env.ACCESS_KEY_TOKEN,
        { expiresIn: "1000s" }
      );
      const refreshToken = jwt.sign(
        { ...user, password: "" },
        process.env.REFRESH_KEY_TOKEN,
        { expiresIn: "10000s" }
      );
      return res
        .cookie("jwt", accessToken, {
          httpOnly: true,
        })
        .json({ accessToken, user });
      // req.session.user = user;
      // req.session.isVerified = user.isVerified;

      // req.session.is_logged_in = true;
      // req.session.name = user.name;
      // res.json(true);
      return;
    }
  }
};

module.exports = { loginUserGet, loginUserPost, refresGet };
