const express = require("express")
const Router = express.Router();
const fareController = require("../controllers/fare-controller");

Router.get("/admin/", fareController.getAllFare)
Router.post("/admin/", fareController.createFare)
Router.put("/admin/", fareController.updateFare)
Router.delete("/admin/:id", fareController.deleteFare)
Router.get("/admin/:id", fareController.getFareById)

module.exports = Router;