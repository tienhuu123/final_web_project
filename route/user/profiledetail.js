
const connect = require('../../database/connect')
const path = require('path')

let home = async (req, res, next) => {

    res.render(path.join(__dirname, '../../view/profiledetail.ejs'), { user: req.session.user })


}

module.exports = home