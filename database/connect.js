const pg = require('pg')
const connetion = pg.Pool
let connect = new connetion({
    user: 'web_j0cr_user',
    host: 'dpg-cfsqjoh4reb6ks4tprng-a.oregon-postgres.render.com',
    database: 'web_j0cr',
    password: 'J6JiSTSUzubQSqCPtkbFQULTvKYfI9NV',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
})
module.exports = connect
