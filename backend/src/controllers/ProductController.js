const ProductSchema = require('../models/ProductSchema')
const fs = require('fs')
const path = require('path')

module.exports = {
    async store(req, res) {
        const { title, price, company, description } = req.body
        const { filename } = req.file || false

        const product = ProductSchema.create({
            title,
            img: filename ? filename : null,
            price, 
            company,
            info: description,
        })

        return res.json(req.body)
    },

    async index(req, res) {
        const products = await ProductSchema.find()
        
        return res.json(products)
    },

    async edit(req, res) {
        const { id } = req.params
        const { title, price, company, description } = req.body
        const { filename } = req.file || false

        ProductSchema.findOne({ _id: id }).then(product => {
            if(product.img && filename) {
                fs.unlink(path.resolve('upload', `${product.img}`), err => {
                    if(err) return res.send({ error: 'Something went wrong!'})
                    console.log('Deleted successfully!')
                })
            }

            product.title = title
            product.price = price
            product.company = company
            product.description = description
            product.img  = filename ? filename : product.img
            product.save().then(() => res.send('All good!'))
        }).catch(err => {
            return res.send('Something went wrong!')
        })
    },

    async remove(req, res) {
        const {id} = req.params

        ProductSchema.deleteOne({_id: id}).then(() => {
            return res.send('All good')
        }).catch(err => {
            return res.send('Something went wrong!')
        })
    }

}