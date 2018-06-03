var mongoose = require("../config/mongodb.config")

var regionSchema = mongoose.Schema({
    //_id: String,
    name: String,
    isActive: Boolean,
    type: String
})

module.exports = mongoose.model('Region', regionSchema, "Regions");