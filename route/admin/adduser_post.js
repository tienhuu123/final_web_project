const connect = require('../../database/connect')
const path = require('path')
let home = async (req, res, next) => {
    let fullname = req.body.fullname
    let email = req.body.email
    let password = req.body.password
    let password_confirmation = req.body.password_confirmation
    let phone = req.body.phone
    let address = req.body.address
    let role = req.body.role
    console.log(role)
    let err = ''
    if (fullname == '') {
        err += "need fullname  <br/>"
    }
   
    

    if(req.body.update){
        let result5 = await connect.query(`update public.user set fullname= '${fullname}',email = '${email}',phone='${phone}', address = '${address}' where id = '${req.body.id}';
        update public.account set password = '${password}',roleid = ${req.body.role} where username= '${req.body.id}';

        `)
        let isSuccess = false
        result5.map((item)=>{
            if(item){
                isSuccess = true
            }
        })
        if(isSuccess){
            res.redirect('manageruser')
        }
        return
    }
    
    let query = `select * from public.account where lower(username) = '${email}'`
    
    try {
        


        let result = await connect.query(query)
        if (result.rowCount > 0) {
            res.render(path.join(__dirname, '../../view/adduser.ejs'), { err: "username is exits" })
        } else {
            let query1 = `insert into public.account (username,password,roleid) values ('${email}','${password}',${role})`

            let result1 = await connect.query(query1)
            if (result1.rowCount > 0) {
                let query2 = `insert into public.user (id,account_id,fullname,email,phone,address) select username,username,'${fullname}','${email}','${phone}','${address}' from public.account where username = '${email}'`

                let result2 = await connect.query(query2)
                res.redirect('manageruser')
            }
        }
    } catch (e) {
        res.render(path.join(__dirname, '../../view/adduser.ejs'), { err: e })
    }

    // let result = await connect.query(query)
    // if (result.rowCount > 0) {
    //     res.render(path.join(__dirname, '../../view/adduser.ejs'), { err: "username is exits" })
    // } else {
    //     let query1 = `insert into public.account (username,password,roleid) values ('${email}','${password}',${role})`

    //     let result1 = await connect.query(query1)
    //     if (result1.rowCount > 0) {
    //         let query2 = `insert into public.user (id,account_id,fullname,email,phone,address) select username,username,'${fullname}','${email}','${phone}','${address}' from public.account where username = '${email}'`

    //         let result2 = await connect.query(query2)
    //         res.redirect('manageruser')
    //     }
    // }
}

module.exports = home