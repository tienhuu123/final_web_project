const express = require('express')
const main_routes = express.Router()

const home = require('./home')
const login = require('./login')
const login_post = require('./login_post')
const logout = require('./logout')
const product = require('./product')
const checkout = require('./checkout')
const updatequantity = require('./updatequantity')
const cart = require('./cart')
const cartd = require('./cartdetail')
const blog = require('./blog')
const profile = require('./user/profile')
const profiledetail = require('./user/profiledetail')

const checkoutdetail = require('./checkoutdetail')
const product_details = require('./product_details')



const profile_post = require('./user/profile_post')

const register = require('./register')
const register_post = require('./register_post')
const invoice = require('./user/invoice')
const search = require('./user/search')



const delete_cart = require('./delete_cart')

main_routes.get('/', home)
main_routes.get('/login', login)
main_routes.get('/logout', logout)
main_routes.get('/product_details', product_details)
main_routes.get('/cart', cart)
main_routes.get('/blog', blog)
main_routes.get('/cartdetail', cartd)
main_routes.post('/checkoutdetail', checkout)
main_routes.get('/checkoutdetail', checkoutdetail)
main_routes.get('/product', product)
main_routes.get('/invoice', invoice)
main_routes.get('/profile', profile)
main_routes.get('/profiledetail', profiledetail)
main_routes.post("/updatequantity", updatequantity);
main_routes.post("/profile", profile_post);


main_routes.get('/search', search)
main_routes.get('/checkout', checkout)
main_routes.post('/login1', login_post)
main_routes.get('/register', register)
main_routes.post('/register', register_post)
main_routes.get('/delete_cart', delete_cart)


module.exports = main_routes