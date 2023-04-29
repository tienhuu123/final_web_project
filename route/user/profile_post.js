
const connect = require('../../database/connect')

const path = require('path')
let home = async (req, res, next) => {
    console.log(req.body.fullname)
    let query = `update public.user set fullname ='${req.body.fullname}' ,email ='${req.body.email}', phone ='${req.body.phone}'  where id = '${req.session.user.username}'`
    let query1 = `update public.account set password ='${req.body.password}' where username = '${req.session.user.username}'`
    let result = await connect.query(query)
    let result1 = await connect.query(query1)
    req.session.user.fullname =  req.body.fullname 
    req.session.user.email = req.body.email 
    req.session.user.phone = req.body.phone 
        res.redirect('profiledetail')

}

module.exports = home