const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images:{
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
})

const Product = mongoose.model('Product', productSchema, 'Products')
module.exports = Product
