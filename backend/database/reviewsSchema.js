const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
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

const Reviews = mongoose.model('review', reviewsSchema);

module.exports = Reviews;