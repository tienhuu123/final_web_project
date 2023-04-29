
const path = require('path')
const connect = require('../database/connect')
let home = async (req, res, next) => {
    console.log(__dirname)
    let date = new Date()

    console.log(req.session);

    const query3 = `select p.name,p.image_url,c.id as cartid, cd.id as cart_detail_id , p.price, cd.product_quantity, p.quantity from public.product as p , public.cart as c, public.cart_detail as cd where p.id =cd.product_id and c.user_id = '${req.session.user.username}' and c.status = 0 and cd.cart_id = c.id order by p.id desc  `
    const query4 = `select * from public.user where account_id = '${req.session.user.username}'`
   
    
    let result3 = await connect.query(query3)
    let result4 = await connect.query(query4)
    let totalAmount = result3.rows.reduce((sum, item) => {
        sum += item.price * item.product_quantity
        return sum
    }, 0)
    if (result3.rowCount > 0) {
        res.render(path.join(__dirname, '../view/checkout.ejs'), { user: result4.rows[0], product: result3.rows, quantity: result3.rowCount, totalAmount: totalAmount, user: req.session.user })
    }
}


module.exports = home

