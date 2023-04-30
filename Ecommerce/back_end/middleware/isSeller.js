const jwt = require("jsonwebtoken");
function isSeller(req, res, next) {
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
      if (req.user.role < 1) {
        res.sendStatus(403).json("Access Denied");
      }
      next();
      return;
    }
  });
}
module.exports = isSeller;
