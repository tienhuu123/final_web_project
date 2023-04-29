const express = require('express')
const main_routes = express.Router()

const home = require('./home')
const login = require('./login')
const login_post = require('./login_post')
const logout = require('./logout')
const product = require('./product')
const blog = require('./blog')
const product_details = require('./product_details')
const register = require('./register')
const register_post = require('./register_post')
const search = require('./user/search')
const success = require('./success')

main_routes.get('/', home)
main_routes.get('/login', login)
main_routes.get('/logout', logout)
main_routes.get('/success', success)
main_routes.get('/product_details', product_details)
main_routes.get('/blog', blog)
main_routes.get('/product', product)

main_routes.get('/search', search)
main_routes.post('/login1', login_post)
main_routes.get('/register', register)
main_routes.post('/register', register_post)


module.exports = main_routes