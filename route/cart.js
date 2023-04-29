
const path = require('path')
const connect = require('../database/connect')
let home = async (req, res, next) => {
    console.log(__dirname)
    let date = new Date()

    console.log(req.session);
    const query = `insert into public.cart(date,user_id,status) select to_timestamp(${date / 1000}),'${req.session.user.username}',0 where not exists (select * from public.cart where user_id = '${req.session.user.username}' and status = 0)`
    let result = await connect.query(query)
    let result3 = await connect.query(`select c.id,cd.product_quantity from public.cart_detail as cd, public.cart as c where product_id = '${req.query.id}' and c.id = cd.cart_id and c.user_id = '${req.session.user.username}' and c.status = 0`)
    let result2
    if(result3.rowCount>0){
        const query2 = `update public.cart_detail set product_quantity = product_quantity + 1 where cart_id = ${result3.rows[0].id} and product_id = '${req.query.id}'`
        result2 = await connect.query(query2)
    }else{
        const query2 = `insert into public.cart_detail( product_quantity,product_id, cart_id) select 1,${req.query.id},id from public.cart where user_id = '${req.session.user.username}' and status = 0`
        result2 = await connect.query(query2)
    }


    if (result2.rowCount > 0) {
        res.redirect('/user/cartdetail')
    }

}




module.exports = home

