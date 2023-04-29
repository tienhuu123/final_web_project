
const connect = require('../../database/connect')
const path = require('path')
let home = async (req, res, next) => {
    let update
    if (req.query.id) {
        update = 1
    }

    console.log(__dirname)
    const query = `select * from public.category`
    let result = await connect.query(query)
    if (update) {
        let query1 = `select * from public.product where id= '${req.query.id}' `
        let result1 = await connect.query(query1)
        if (result1.rowCount > 0) {

            res.render(path.join(__dirname, '../../view/addproduct.ejs'), { category: result.rows, quantity: result.rowCount, err: req.query.err ? req.query.err : "", product: result1.rows })
            return
        }
    }

    if (result.rowCount > 0) {
        res.render(path.join(__dirname, '../../view/addproduct.ejs'), { category: result.rows, quantity: result.rowCount, err: req.query.err ? req.query.err : "", user: req.session.user })
    } else {
        res.render(path.join(__dirname, '../../view/addproduct.ejs'), { category: "don't have any", quantity: 0, err: req.query.err ? req.query.err : "", user: req.session.user })
    }


}

module.exports = home