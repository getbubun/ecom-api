// importing mongoose module
const mongoose = require('mongoose')
// import schema
const Schema = mongoose.Schema;

let productSchema = new Schema(
    {
        productId: {
            type: String,
            unique: true
        },
        name: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        price: {
            type: Number
        },
        brand: {
            type: String,
            default: ''
        },
        cashOnDelivery: {
            type: Boolean,
            default: false
        },
        category: {
            type: String,
            default: ''
        }

    }
)

mongoose.model('Product', productSchema);
