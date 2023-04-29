const connect = require('../../database/connect')
const path = require('path')
let home = async (req, res, next) => {
    console.log(__dirname)
    let query = `select  count(i.id),sum(cd.product_quantity*p.price) as sumtotal from public.invoice as i ,public.cart as c ,public.product as p,public.cart_detail as cd where i.cart_id = c.id and cd.cart_id = c.id and p.id = cd.product_id  `
    let query1 = `select status, count(id) from public.invoice group by status order by status`
    let query2 = `select count(id) from public.user `
    let result2 = await connect.query(query2)
   
    let result1 = await connect.query(query1)
   
    let result = await connect.query(query)

    
    res.render(path.join(__dirname, '../../view/dashboard.ejs'), { user: req.session.user, invoice: result.rows, status: result1.rows, user1: result2.rows})

}

module.exports = home
