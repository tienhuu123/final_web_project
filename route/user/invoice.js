
const bodyParser = require('body-parser')
const connect = require('../../database/connect')

const path = require('path')
let home = async (req, res, next) => {

    const query = `select * from public.invoice   where invoice.user_id= '${req.session.user.username}' `
    let result = await connect.query(query)


    let query2 = `select i.id, sum(cd.product_quantity),sum(cd.product_quantity*p.price) as sumtotal from public.invoice as i ,public.cart as c ,public.product as p,public.cart_detail as cd where i.user_id = '${req.session.user.username}' and i.cart_id = c.id and cd.cart_id = c.id and p.id = cd.product_id group by i.id `
    let result2 = await connect.query(query2)
    console.log(result2);
    let invoicedetail = result.rows.reduce((init, item, i) => {

        if (result2.rows.filter((e) => e.id == item.id).length > 0) {
            init.push({ ...item, sum: result2.rows.filter((e) => e.id == item.id)[0].sum, sumtotal: result2.rows.filter((e) => e.id == item.id)[0].sumtotal })
        } else {
            init.push({ ...item, sum: 0, sumtotal: 0 })
        }
        return init
    }, [])


    if (result.rowCount > 0) {
        res.render(path.join(__dirname, '../../view/invoice.ejs'), { invoice: invoicedetail, quantity: result.rowCount, user: req.session.user })
    }
}

module.exports = home