const connect = require('../database/connect')
const path = require('path')
const { route } = require('./Home_Controller')
let home = async (req, res, next) => {
    let fullname = req.body.fullname
    let email = req.body.email
    let password = req.body.password
    let password_confirmation = req.body.password_confirmation
    let phone = req.body.phone
    let address = req.body.address
    let err = ''
    if (fullname == '') {
        err += "need fullname  <br/>"
    }
    if (email == '') {
        err += "need email  <br/>"
    } else {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!regex.test(email)) {
            err += "email must same format (example @host.com)  <br/>"
        }
    }
    if (password == '') {
        err += "password can't empty  <br/>"
    }
    if (password_confirmation == '') {
        err += "passwor confirmation can't empty <br/> "
    }
    if (password != password_confirmation) {
        err += "password and password confirmation must same"
    }
    if (err != "") {
        res.render(path.join(__dirname, '../view/register.ejs'), { err: err })
        return
    }
    let query = `select * from public.account where lower(username) = '${email}'`
    let result = await connect.query(query)
    if (result.rowCount > 0) {
        res.render(path.join(__dirname, '../view/register.ejs'), { err: "username is exits" })
    } else {
        let query1 = `insert into public.account (username,password,roleid) values('${email}','${password}',2)`

        let result1 = await connect.query(query1)
        if (result1.rowCount > 0) {
            let query2 = `insert into public.user (id,account_id,fullname,email,phone,address) select username,username,'${fullname}','${email}','${phone}','${address}' from public.account where username = '${email}'`

            let result2 = await connect.query(query2)
            req.session.user = { username: email, roleid: 2 }
            res.redirect('/')
        }
    }
}

module.exports = home