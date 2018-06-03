var mongoose = require("../config/mongodb.config")
var RideInfo = require("./ride-info.model")
var UserModel = require("./user.model")
var CabFareModel = require("./cab-fare.model")

var bookingSchema = mongoose.Schema({
    flagFallFare: Number,
    distanceFare: Number,
    bookingFees: Number,
    premiumServiceCharge: Number,
    pickupFromAirportCharge: Number,
    totalFare: Number,
    fareType: String,
    gstOnElectronicPayment: Number,
    serviceType: String,
    limit: Number,
    imgURL: String,
    cabName: String,
    serviceFee: Number,

    pickupLatitude: Number,
    pickupLongitude: Number,
    destinationLatitude: Number,
    destinationLongitude: Number,
    pickupAddress: String,
    destinationAddress: String,
    passengers: Number,
    pickupDate: Date,
    pickupTime: String,
    totalDistance: String,

    userId: String,
    uid: String,
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,

    bookingDate: Date,
    bookingModifiedDate: Date,

    paymentMode: String,
    payStatus: String,
    payAmount: Number,
    stripePaymentId: String,
    paymentDoneTime: String,
    stripeToken: String,
    balanceTransaction: String,
    stripePaymentCurrenct: String,
    stripeNetworkStatus: String,
    stripeRiskLevel: String
})

module.exports = mongoose.model('Booking', bookingSchema, "Bookings");