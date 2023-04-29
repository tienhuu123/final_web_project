
const path = require('path')
const connect = require('../../database/connect')



let home = async (req, res, next) => {
    let id = req.body.id
    let name = req.body.name


    let err = ''
    if (id == '') {
        err += "id can't empty  <br/>"
    }

    if (name == '') {
        err += "name can't empty  <br/>"
    }

    if (err != "") {
        res.render(path.join(__dirname, '../../view/addrole.ejs'), { err: err })
        return
    }


    try {
        let query = `insert into public.role(id,name) values(${id},'${name}')`
        if (req.body.update) {
            query = `update public.role set name = '${name}' where id = ${id}`

        } else if (req.body.update) {
            query = `update public.role set name = '${name}' where id = ${id} `
        }

        let result = await connect.query(query)
        if (result.rowCount > 0) {
            res.redirect('managerrole')
        } else {
            res.render(path.join(__dirname, '../../view/addrole.ejs'), { err: " error " })
        }

    } catch (e) {
        res.render(path.join(__dirname, '../../view/addrole.ejs'), { err: e })
    }


}

module.exports = home