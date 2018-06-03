var CustomError = require("../error-handlers/custom-error")
var BookingModel = require("../models/booking.model")
var RideInfoModel = require("../models/ride-info.model")
var CabFareModel = require("../models/cab-fare.model")
var UserModel = require("../models/user.model")
const config = require('config');
let stripeConfig = config.get('appConfig.stripeConfig');
const stripe = require("stripe")(stripeConfig.stripeKey);
const sendInvoice = require("../services/email.service")

payNow = (req, res, next) => {
    console.log("Create Booking called")
    let newBooking = new BookingModel(req.body);
    let totalAmount = (newBooking.totalFare.toFixed(2)) * 100;
    newBooking.payAmount = totalAmount;
    const charge = stripe.charges.create({
        amount: totalAmount,
        currency: 'usd',
        source: newBooking.stripeToken,
    }).then(
        (data) => {
            console.log("payment done ", data)
            newBooking.stripePaymentId = data.id;
            newBooking.paymentDoneTime = new Date();
            newBooking.balanceTransaction = data.balance_transaction;
            newBooking.stripePaymentCurrenct = data.currency;
            newBooking.stripeNetworkStatus = data.outcome.network_status;
            newBooking.stripeRiskLevel = data.outcome.network_status
            newBooking.payStatus = "Payment Done";
            newBooking.save(newBooking).then(
                (data) => {
                    console.log("data is ", data)
                    sendInvoice(data, "Your Luxo Cabs invoice is available")
                    res.send(data)
                }
            ).catch(
                (error) => {
                    console.log("error is ", error)
                    throw new CustomError("Error while creating Booking", 500)
                }
            )
        }
    ).catch(
        (error) => {
            console.log("error is ", error)
            throw new CustomError("Error while creating Booking", 500)
        }
    );
}

createBooking = (req, res, next) => {
    console.log("Create Booking called")
    let newBooking = new BookingModel(req.body);
    newBooking.bookingDate = new Date();
    console.log("booking model is ", newBooking)
    newBooking.save(newBooking).then(
        (data) => {
            console.log("data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("error is ", error)
            throw new CustomError("Error while creating Booking", 500)
        }
    )
}

updateBooking = (req, res, next) => {
    console.log("update Booking called")

    let newBooking = new BookingModel(req.body);

    BookingModel.findByIdAndUpdate(newBooking._id, newBooking).then(
        (data) => {
            console.log("data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("error is ", error)
            throw new CustomError("Error while updating Booking", 500)
        }
    )
}

getAllBooking = (req, res, next) => {
    console.log("getAll Booking called")
    BookingModel.find().then(
        (data) => {
            console.log("Data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while fetching all Booking", 500)
        }
    )
}

getBookingById = (req, res, next) => {
    BookingModel.findById(req.params.id).then(
        (data) => {
            console.log("Data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while fetching Booking by id", 500)
        }
    )
}

deleteBooking = (req, res, next) => {
    console.log("delete Booking called")

    BookingModel.deleteOne({ _id: req.params.id }).then(
        (data) => {
            console.log("Data is ", data)
            res.send("Booking is deleted")
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while deleting Booking by id", 500)
        }
    )
}

module.exports = {
    createBooking,
    updateBooking,
    getAllBooking,
    getBookingById,
    deleteBooking,
    payNow
}