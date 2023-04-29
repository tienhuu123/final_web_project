
const connect = require('../../database/connect')
const path = require('path')
let home = async (req, res, next) => {

    const query = `delete from public.product where id ='${req.query.id}'`
    let result = await connect.query(query)
    if (result.rowCount > 0) {
        res.redirect('managerproduct')
        
    } else {
        res.render(path.join(__dirname, '../../view/managerproduct.ejs'), { product: "don't have any", quantity: 0, err: req.query.err ? req.query.err : "" })
    }

}

module.exports = home