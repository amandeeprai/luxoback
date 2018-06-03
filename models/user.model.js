var mongoose = require("../config/mongodb.config")

var userSchema = mongoose.Schema({
    //_id: String,
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    roles: [String],
    isUserVerified: Boolean,
    uid: String,
})

module.exports = mongoose.model('User', userSchema, "Users");