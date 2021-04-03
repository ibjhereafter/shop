const mongoose = require('mongoose');
const reviewsSchema = require('./reviewsSchema');

const productsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please, provide the user who wants to add the product.'],
        ref: 'user'
    },

    name: {
        type: String,
        required: [true, 'Please, provide the name of the product.'],
    },

    image: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        required: [true, 'Please, provide the brand of the product.']
    },

    category: {
        type: String,
        required: [true, 'Please, provide the category of the product.']
    },

    description: {
        type: String,
        required: [true, 'Please, provide a description for the product.']
    },

    reviews: [reviewsSchema],

    averageRating: {
        type: Number,
        required: true,
        default: 0
    },

    numberOfReviews: {
        type: Number,
        required: true,
        default: 0
    },

    price: {
        type: Number,
        required: [true, 'Please, provide a price for the product.'],
        default: 0
    },

    stock: {
        type: Number,
        required: [true, 'Please provide the total number of this product in stock.'],
        default: 0
    }
}, {
    timestamps: true
});

const Products = mongoose.model('product', productsSchema);

module.exports = Products;