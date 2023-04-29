const path = require("path");
let home = (req, res, next) => {
  console.log(__dirname);
  res.render(path.join(__dirname, "../view/blog.ejs"), { user: req.session.user });
};

module.exports = home;
