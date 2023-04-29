
const connect = require('../../database/connect')
const path = require('path')
let home = async (req, res, next) => {

    const query = `delete from public.user where id ='${req.query.id}'`
    let result = await connect.query(query)
    if (result.rowCount > 0) {
        res.redirect('manageruser')
    } else {
        res.render(path.join(__dirname, '../../view/manageruser.ejs'), { user: "don't have any", quantity: 0, err: req.query.err ? req.query.err : "" })
    }


}

module.exports = home