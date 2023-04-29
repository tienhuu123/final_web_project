const connect = require('../../database/connect')
const path = require('path')
let home = async (req, res, next) => {
    let update
    if (req.query.id) {
        update = 1
    }
    console.log(__dirname)
    const query = `select role.id,role.name from public.role `
    let result = await connect.query(query) 
    if (update) {
        let query1 = `select * from public.user as u inner join public.account as a on a.username = u.id where id = '${req.query.id}'`
        let result1 = await connect.query(query1)
        if (result1.rowCount > 0) {

            res.render(path.join(__dirname, '../../view/adduser.ejs'), { useredit: result1.rows, role: result.rows, quantity: result.rowCount, user: req.session.user })
            return
        }else{
            res.render(path.join(__dirname, '../../view/adduser.ejs'), { useredit:"none", role: result.rows, quantity: result.rowCount, err: req.query.err ? req.query.err : "", user: req.session.user })
            return
        }
    }
    res.render(path.join(__dirname, '../../view/adduser.ejs'), { role: result.rows, quantity: result.rowCount, user: req.session.user })
}
module.exports = home
