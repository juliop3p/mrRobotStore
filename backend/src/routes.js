const express = require('express')
const routes = express.Router()
const multer = require('multer')
const uploadConfig = require('./config/upload')
const upload = multer(uploadConfig)

const ProductController = require('./controllers/ProductController')
const AdminController = require('./controllers/AdminController')

//Post
routes.post('/new-product', upload.single('img'), ProductController.store)

routes.post('/signout', AdminController.signOut)
routes.post('/signin', AdminController.signIn)

//Get
routes.get('/products', ProductController.index)

//Put
routes.put('/edit/:id', upload.single('img'), ProductController.edit)

//delete
routes.delete('/remove/:id', ProductController.remove)


module.exports = routes