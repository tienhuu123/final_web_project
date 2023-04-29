
const connect = require('../database/connect')
const path = require('path')
let home = async (req, res, next) => {
    const query = `delete from public.cart_detail where id ='${req.query.id}'`
    let result = await connect.query(query)
    if (result.rowCount > 0) {
        res.redirect('cartdetail')
    } else {
        res.render(path.join(__dirname, '../view/cart.ejs'), { cart_detail: "don't have any", quantity: 0, err: req.query.err ? req.query.err : "" })
    }
}

module.exports = home