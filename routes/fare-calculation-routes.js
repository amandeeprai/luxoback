const express = require("express")
const Router = express.Router();
const fareCalculationController = require("../controllers/fare-calculation-controller");

Router.post("/", fareCalculationController.checkFare)

module.exports = Router;