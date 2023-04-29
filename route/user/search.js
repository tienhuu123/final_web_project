
const connect = require('../../database/connect')
const path = require('path')

let home = async (req, res, next) => {
        let query = `select c.name as catename, p.name, p.price, p.id, p.details, p.image_url from public.product as p, public.category as c where p.category_id = c.id and (lower(p.name) like '%${req.query.search.toLowerCase() }%' or lower(c.name) like  '%${req.query.search.toLowerCase() }%' )`

        let result = await connect.query(query)
        

        if (result.rowCount > 0) {
                res.render(path.join(__dirname, '../../view/search.ejs'), { search: result.rows, quantity: result.rowCount,user :req.session.user })
        }

}

module.exports = home