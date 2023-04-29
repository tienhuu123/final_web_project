const connect = require('../../database/connect')
const path = require('path')
let home = async (req, res, next) => {
    console.log(__dirname)
    let update
    if (req.query.id) {
        update = 1
    }

    if (update) {
        let query1 = `select * from public.role where id= ${req.query.id} `
        let result1 = await connect.query(query1)
        if (result1.rowCount > 0) {
            console.log(result1)
            res.render(path.join(__dirname, '../../view/addrole.ejs'), { role: result1.rows[0], quantity: result1.rowCount, err: req.query.err ? req.query.err : "", user: req.session.user })
            return
        }
        return
    }


    res.render(path.join(__dirname, '../../view/addrole.ejs'), { err: req.query.err ? req.query.err : "", user: req.session.user })

}

module.exports = home

