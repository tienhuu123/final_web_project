
const path = require('path')
const connect = require('../../database/connect')
let home = async (req, res, next) => {
    console.log(__dirname)

    const query = `select * from public.category`
    let result = await connect.query(query)

    if (result.rowCount > 0) {
        res.render(path.join(__dirname, '../../view/managercategory.ejs'), { category: result.rows, quantity: result.rowCount, user: req.session.user })
    } else {
        res.render(path.join(__dirname, '../../view/managercategory.ejs'), { category: "don't have any", quantity: 0, user: req.session.user })
    }
}

module.exports = home