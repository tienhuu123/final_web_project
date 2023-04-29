
const path = require('path')
const connect = require('../../database/connect')



let home = async (req, res, next) => {

    let id = req.body.id
    let name = req.body.name
    let price = req.body.price
    let quantity = req.body.quantity
    let details = req.body.details
    let image_url = req.files
    let category_id = req.body.category_id

    if (image_url[0]) {
        image_url = req.files[0].path
    }

    let err = ''
    if (id == '') {
        err += "id can't empty  <br/>"
    }

    if (name == '') {
        err += "name can't empty  <br/>"
    }
    console.log(id)

    if (err != "") {
        console.log(1)
        res.redirect(`addproduct?err=${err}`)
        return
    }


   try {
       let query = `insert into public.product(id,name,price,quantity,details,image_url,category_id) values(${id},'${name}','${price}','${quantity}','${details}','${image_url}','${category_id}')`
       if (req.body.update && image_url) {
           query = `update public.product set name = '${name}', price= '${price}',quantity ='${quantity}', details = '${details}',category_id= '${category_id}' where id = ${id}`

       } else if (req.body.update) {
           query = `update public.product set name = '${name}', price= '${price}',quantity ='${quantity}',image_url = '${image_url}', details = '${details}',category_id= '${category_id}' where id = ${id} `
       }

       let result = await connect.query(query)

       if (result.rowCount > 0) {
           res.redirect('managerproduct')
       } else {
           res.render(path.join(__dirname, '../../view/addproduct.ejs'), { err: "error " })
       }
   } catch (e) {
       res.render(path.join(__dirname, '../../view/addproduct.ejs'), { err: e })
   }



}

module.exports = home