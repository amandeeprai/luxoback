const express = require("express")
const Router = express.Router();
const userRouter = require("./user-routes")
const regionRouter = require("./region-routes")
const locationRouter = require("./location-routes")
const blogRouter = require("./blog-routes")
const bookingRouter = require("./booking-routes")
const fareRouter = require("./fare-routes")
const fareCalculationRouter = require("./fare-calculation-routes")

Router.use("/rest/api/user", userRouter)
    //Router.use("/rest/api/region", regionRouter)
    //Router.use("/rest/api/location", locationRouter)
Router.use("/rest/api/blog", blogRouter)
Router.use("/rest/api/booking", bookingRouter)
Router.use("/rest/api/fare", fareRouter)
Router.use("/rest/api/fare-calculation", fareCalculationRouter)

module.exports = Router;