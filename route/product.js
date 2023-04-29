
const path = require('path')
const connect = require('../database/connect')
let home = async (req, res, next) => {
    console.log(__dirname)
    const query = `select * from public.category`
    let result = await connect.query(query)
    let query2 = `select * from public.product`
    let count = 0
    if (req.query.cateid) {
        query2 += ` where category_id = '${req.query.cateid}'`
        count++
    }
    if (req.query.price) {
        switch (req.query.price) {
            case '1':
                if (count > 0) { query2 += ` and price >= 0 and price <= 500` } else {
                    query2 += ` where price >= 0 and price <=500 `
                }
                break;
            case '2':
                if (count > 0) { query2 += ` and price >= 500 and price <= 1000` } else {
                    query2 += ` where price >= 500 and price <=1000 `
                }
                break;
            case '2':
                if (count > 0) { query2 += ` and price >= 1000 and price <= 1500` } else {
                    query2 += ` where price >= 1000 and price <=1500 `
                }
                break;
            default:
                break;

        }
    }

    let result2 = await connect.query(query2)
    console.log(result2)
    res.render(path.join(__dirname, '../view/product.ejs'), { category: result.rows, quantitycate: result.rowCount, product: result2.rows, quantitypro: result2.rowCount, user: req.session.user })
}

module.exports = home