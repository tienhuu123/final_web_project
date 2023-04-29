
const path = require('path')
const connect = require('../database/connect')
const { request } = require('http')

let home = async (req, res, next) => {
    console.log(req.session)
    let email = req.body.email
    let password = req.body.password

    let err = ''
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
    if (err != "") {
        res.render(path.join(__dirname, '../view/login.ejs'), { err: err })
        return
    }
    let result = await connect.query(`select * from public.account where lower(username) =  '${req.body.email}' and password = '${req.body.password}'`)
    console.log(result)
    if (result.rowCount > 0) {
        let result1 = await connect.query(`select a.password, u.fullname,u.id as username,u.email,u.phone,u.address,r.id as roleid from public.account as a, public.user as u,public.role as r where lower(a.username) =  '${req.body.email}' and lower(a.username) = u.id and a.roleid = r.id`)
        if (result1.rowCount > 0) {
            if (result1.rows[0].roleid == 1) {
                result1.rows[0] = { ...result1.rows[0], isAdmin: true, isUser: true, isManager: true }
                req.session.user = result1.rows[0]
                res.redirect('/admin/dashboard')
            } else if (result1.rows[0].roleid == 2) {
                result1.rows[0] = { ...result1.rows[0], isUser: true }
                req.session.user = result1.rows[0]
                res.redirect('/')
            } else if (result1.rows[0].roleid == 3) {
                result1.rows[0] = { ...result1.rows[0], isManager: true, isUser: true }
                req.session.user = result1.rows[0]
                res.redirect('/manager/dashboard')
            } else {
                res.render(path.join(__dirname, '../view/login.ejs'), { err: "unknow" })
            }

        } else {
            res.render(path.join(__dirname, '../view/login.ejs'), { err: "username or password not found" })
        }
    }
}
module.exports = home