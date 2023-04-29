const path = require("path");
let logout = (req, res, next) => {
  console.log(__dirname);
  req.session = null;

  res.redirect("/login");
};
module.exports = logout;
