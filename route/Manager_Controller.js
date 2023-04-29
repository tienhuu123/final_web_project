const express = require("express");
const main_routes = express.Router();


const dashboard = require("./admin/dashboard");

const login = require('./login')
const login_post = require('./login_post')
const logout = require('./logout')
const product = require('./product')
const checkout = require('./checkout')

const cart = require('./cart')
const cartd = require('./cartdetail')
const blog = require('./blog')
const checkoutdetail = require('./checkoutdetail')
const product_details = require('./product_details')

const register = require('./register')
const register_post = require('./register_post')
const invoice = require('./user/invoice')
const search = require('./user/search')



const delete_cart = require('./delete_cart')

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/image");
  },
  filename: function (req, file, cb) {
    console.log(req);
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});
var upload = multer({ storage: storage });

const addproduct = require("./admin/addproduct");
const addproduct_post = require("./admin/addproduct_post");
const managerproduct = require("./admin/managerproduct");
const managercategory = require("./admin/managercategory");
const managerinvoice = require("./admin/managerinvoice");
const addcategory = require("./admin/addcategory");
const addcategory_post = require("./admin/addcategory_post");
const deletecategory = require("./admin/deletecategory");
const deleteproduct = require("./admin/deleteproduct");
const updatesatus = require("./admin/updatestatus");

main_routes.get("/dashboard", dashboard);
main_routes.get("/addproduct", addproduct);
main_routes.post("/addproduct", upload.any(), addproduct_post);
main_routes.post("/addcategory", addcategory_post);
main_routes.get("/managerproduct", managerproduct);
main_routes.get("/updatestatus", updatesatus);
main_routes.get("/deletecategory", deletecategory);
main_routes.get("/deleteproduct", deleteproduct);
main_routes.get("/managercategory", managercategory);
main_routes.get("/managerinvoice", managerinvoice);
main_routes.get("/addcategory", addcategory);

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

main_routes.get('/search', search)
main_routes.get('/checkout', checkout)
main_routes.post('/login1', login_post)
main_routes.get('/register', register)
main_routes.post('/register', register_post)
main_routes.get('/delete_cart', delete_cart)

module.exports = main_routes;

