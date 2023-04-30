function isAdmin(req, res, next) {
  // if(req.session)
  if (req.session && req.session.isAdmin) {
    next();
    return;
  } else {
    res.redirect("/admin/login");
  }
}
module.exports = isAdmin;
