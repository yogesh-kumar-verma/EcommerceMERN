const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const dir =
  "/home/yogesh/webprojects/CodeQuotient/web-projects-Html-Css-Js-/EcommerceWithMongo/user.txt";
const UserModal = require("../database/users");
const sendEmail = require("../methods/sendEmail");
if (process.env.ISSQL) {
  var {
    getUserByUsername,
    getUserByEmail,
    createUser,
  } = require("../services/sqlservices/userSqlServices");
} else {
  var {
    getUserByUsername,
    getUserByEmail,
    createUser,
  } = require("../services/userMongoServices");
}
const signupUserGet = (req, res) => {
  let name = null;
  let error = null;
  res.render("signup.ejs", { name, error, isSeller: false });
  return;
};
const signupUserPost = async (req, res) => {
  let user = await getUserByUsername(req.body.username);
  let email1 = await getUserByEmail(req.body.email);
  let flag = false;
  let { name, username, email, password, mobile } = req.body;

  if (!name || !username || !email || !password || !mobile) {
    let name = null;
    ("kuchh toh ja rha hai");
    let error = "please fill all the details correctly";

    res.status(400).json(error);
    return;
  }

  if (user !== undefined) {
    let name = null;
    let error = "User name is already taken";

    res.status(400).json(error);
    return;
  } else if (email1 != undefined) {
    let name = null;
    let error = "Email is already taken";
    res.status(400).json(error);
    return;
  } else {
    let userCurrent = await createUser(
      req.body.name,
      req.body.email,
      req.body.username,
      req.body.password,
      req.body.mobile
    );

    sendEmail(req.body.email, req.body.name, userCurrent, (err, data) => {
      if (err) {
        let name = null;
        let error = "Wrong gmail";
        console.log(error);
        res.status(400).json(error);
        return;
      } else {
        res.status(200).json(true);
      }
    });
  }
};

module.exports = { signupUserGet, signupUserPost };
