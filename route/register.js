
const path = require('path')
let home = (req, res, next) => {
    console.log(__dirname)
    res.render(path.join(__dirname, '../view/register.ejs'), {})
}
module.exports = home
