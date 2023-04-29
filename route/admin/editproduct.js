
const connect = require('../../database/connect')
const path = require('path')
let home = async (req, res, next) => {
    console.log(__dirname)
    const query = `select * from public.category`
    let result = await connect.query(query)
    if (result.rowCount > 0) {
        res.render(path.join(__dirname, '../../view/edit.ejs'), { category: result.rows, quantity: result.rowCount, err: req.query.err ? req.query.err : "", user: req.session.user })
    } else {
        res.render(path.join(__dirname, '../../view/edit.ejs'), { category: "don't have any", quantity: 0, err: req.query.err ? req.query.err : "", user: req.session.user })
    }


}

module.exports = home