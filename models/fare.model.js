var mongoose = require("../config/mongodb.config")
    // holidayRateFare (is equal to peak fare),
var fareSchema = mongoose.Schema({
    //_id: String,
    flagFallFare: Number,
    distanceFare: Number,
    bookingFees: Number,
    maxiTaxiFare: Number,
    premiumServiceCharge: Number,
    pickupFromAirportCharge: Number,
    gstOnElectronicPayment: Number,
    fareType: String
})

module.exports = mongoose.model('Fare', fareSchema, "Fares");