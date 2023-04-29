
const path = require('path')
const connect = require('../../database/connect')
let home = async (req, res, next) => {
    console.log(__dirname)

    const query = `select * from public.role`
    let result = await connect.query(query)

    if (result.rowCount > 0) {
        res.render(path.join(__dirname, '../../view/managerrole.ejs'), { role: result.rows, quantity: result.rowCount, user: req.session.user })
    } else {
        res.render(path.join(__dirname, '../../view/managerrole.ejs'), { role: "don't have any", quantity: 0, user: req.session.user })
    }
}

module.exports = home