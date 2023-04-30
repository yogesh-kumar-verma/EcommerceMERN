const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

function isAuth(req, res, next) { 
  const { cookie } = req.headers;
  if (!cookie) {
    return res.sendStatus(401);
  } 

  const token = cookie.split("jwt=")[1].split(";")[0];  
  jwt.verify(token, process.env.ACCESS_KEY_TOKEN, (err, decoded) => {
    if (err) {
      console.log("error", err);
      res.sendStatus(403);
      return;
    } else {
      req.user = decoded;
    
      next();
      return;
    }
  });
  // } else if (req.session.is_logged_in && req.session.isVerified == false) {
  //   res.send("Check your Email For Verification");
  //   return;
  // }
  // res.redirect("/login");
}
module.exports = isAuth;
