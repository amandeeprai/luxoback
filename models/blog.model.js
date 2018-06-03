var mongoose = require("../config/mongodb.config")

var blogSchema = mongoose.Schema({
    //_id: String,
    authorName: String,
    publishingDate: Date,
    type: String,
    title: String,
    shortDescription: String,
    longDescription: String,
    facebookURL: String,
    twitterURL: String,
    instagramURL: String,
    googleURL: String,
    linkedInURL: String,
    blogFrontImageURL: String,
    blogThumbnailURL: String,
    likes: Number
})

module.exports = mongoose.model('Blog', blogSchema, "Blogs");