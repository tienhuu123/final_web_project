
const path = require('path')
const connect = require('../../database/connect')
let home = async (req, res, next) => {
    console.log(__dirname)

    let query = `select a.username, u.fullname, r.name,u.id from public.account as a, public.user as u, public.role as r where u.account_id = a.username and a.roleid = r.id `


    let result = await connect.query(query)

    if (result.rowCount > 0) {
        res.render(path.join(__dirname, '../../view/manageruser.ejs'), { userlist: result.rows, quantity: result.rowCount, user: req.session.user })
    } else {
        res.render(path.join(__dirname, '../../view/manageruser.ejs'), { userlist: "don't have any", quantity: 0, user: req.session.user })
    }
}

module.exports = home