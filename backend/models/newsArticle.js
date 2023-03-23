const mongoose = require('mongoose');
const NewsArticleContent = require('./newsArticleContent');
const Image = require('./image');

const newsArticleSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    bannerImage: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('NewsArticle', newsArticleSchema);