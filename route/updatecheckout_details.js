const path = require('path')
const connect = require('../database/connect')
let home = async (req, res, next) => {
    console.log(__dirname)
    let date = new Date()
    const id = req.body.id
    const quantity = req.body.quantity
    console.log(req.session);
    const query3 = `update public.cart_detail set product_quantity = ${quantity} where id = ${id}`
    let result3 = await connect.query(query3)
    console.log(result3)
    if (result3.rowCount > 0) {
        res.redirect('/checkoutdetail')
    }
}

module.exports = home

