const express = require("express");
const main_routes = express.Router();

const dashboard = require("./admin/dashboard");

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
const managerrole = require("./admin/managerrole");

const managercategory = require("./admin/managercategory");
const managerinvoice = require("./admin/managerinvoice");
const manageruser = require("./admin/manageruser");
const addcategory = require("./admin/addcategory");
const addrole = require("./admin/addrole");
const adduser = require("./admin/adduser");


const addcategory_post = require("./admin/addcategory_post");
const addrole_post = require("./admin/addrole_post");
const adduser_post = require("./admin/adduser_post");

const deletecategory = require("./admin/deletecategory");
const deleteproduct = require("./admin/deleteproduct");
const deleteuser = require("./admin/deleteuser");

const updatesatus = require("./admin/updatestatus");


main_routes.get("/dashboard", dashboard);
main_routes.get("/addproduct", addproduct);
main_routes.post("/addproduct", upload.any(), addproduct_post);
main_routes.get("/addcategory", addcategory);
main_routes.post("/addcategory", addcategory_post);
main_routes.get("/addrole", addrole);
main_routes.post("/addrole", addrole_post);
main_routes.get("/adduser", adduser);
main_routes.post("/adduser", adduser_post);



main_routes.get("/managerproduct", managerproduct);
main_routes.get("/updatestatus", updatesatus);
main_routes.get("/deletecategory", deletecategory);
main_routes.get("/deleteproduct", deleteproduct);
main_routes.get("/deleteuser", deleteuser);
main_routes.get("/managercategory", managercategory);
main_routes.get("/managerrole", managerrole);


main_routes.get("/managerinvoice", managerinvoice);
main_routes.get("/manageruser", manageruser);

module.exports = main_routes;
