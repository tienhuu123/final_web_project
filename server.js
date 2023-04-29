const express = require('express')
const app = express()
const home_controller = require('./route/Home_Controller')
const admin_controller = require('./route/Admin_Controller')
const manager_controller = require('./route/Manager_Controller')
const customer_controller = require('./route/Customer_Controller')


const port = 3000


const ejs = require('ejs')
const path = require('path')
app.set('view engine', 'ejs')
app.use('/public', express.static((__dirname + '/public')))

const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1)

app.use(cookieSession({
  name: 'session',
  keys: ['vothanhnamphuong'],


}))

// Phan quyen cho admin
app.use('/admin', (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.isAdmin) {
      next()
      return
    } else {
      res.redirect('/login')
    }
  } else {
    res.redirect('/login')
  }
}, admin_controller)

// Phan quyen cho manager
app.use('/manager', (req, res, next) => {
  if(req.session.user) {
    if(req.session.user.isManager) {
      next()
      return
    } else {
      res.redirect('/login')
    }
  } else {
    res.redirect('/login')
  }
}, manager_controller)
// Phan quyen user
app.use('/user', (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.isUser) {
      next()
      return
    } else {
      res.redirect('/login')
    }
  } else {
    res.redirect('/login')
  }
}, home_controller)
app.use('/', customer_controller)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



