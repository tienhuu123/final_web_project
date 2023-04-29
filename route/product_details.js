const path = require("path");
const connect = require("../database/connect");
let home = async (req, res, next) => {
  console.log(__dirname);
  console.log(req.query.id);
  let query2 = `select p.id, p.image_url,c.name,p.price,p.details,p.name from public.category as c, public.product as p where p.id = '${req.query.id}' and p.category_id = c.id `;
  let result2 = await connect.query(query2)
  let query3 = `select * from public.product`
  let result3 = await connect.query(query3)
  console.log(result2);

  res.render(path.join(__dirname, "../view/product_details.ejs"), {
    product: result2.rows[0],
    quantity: result2.rowCount,
    user: req.session.user,
    quantitypro: result3.rowCount,
    product1: result3.rows
  });
};
module.exports = home;
