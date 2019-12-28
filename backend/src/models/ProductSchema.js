const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    img: {
        type: String,
    },
    price: {
        type: Number,
        default: 0,
    },
    company: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: true
    },
    inCart: {
        type: Boolean,
        default: false,
    },
    count: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    }
})

ProductSchema.virtual('img_url').get(function() {
    return `http://localhost:8080/files/${this.img}`
})


module.exports = mongoose.model('Products', ProductSchema)