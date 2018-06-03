const express = require("express")
const Router = express.Router();
const bookingController = require("../controllers/booking-controller");

Router.get("/admin/", bookingController.getAllBooking)
Router.post("/secured/pay-later", bookingController.createBooking)
Router.put("/admin/", bookingController.updateBooking)
Router.delete("/admin/:id", bookingController.deleteBooking)
Router.get("/secured/:id", bookingController.getBookingById)
Router.post("/secured/pay-now", bookingController.payNow)

module.exports = Router;