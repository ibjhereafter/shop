const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please, provide the user who wants to add the product.'],
        ref: 'user'
    },
    
   name: {
       type: String,
       required: [true, 'Please, provide the name for this review.']
   },

    rating: {
       type: Number,
        required: [true, 'Please, provide a rating (between 1 - 5) for this review.']
    },

    comment: {
       type: String,
        required: [true, 'Please, provide a comment for this review']
    }
}, {
    timestamps: true
});


module.exports = reviewsSchema;