var mongoose = require("../config/mongodb.config")

var locationSchema = mongoose.Schema({
    //_id: String,
    name: String,
    type: String,
    regionId: String,
    isActive: Boolean
})

module.exports = mongoose.model('Location', locationSchema, "Regions");