const express = require("express")
const Router = express.Router();
const locationController = require("../controllers/location-controller");

Router.get("/", locationController.getAllLocation)
Router.get("/by/region/:regionId", locationController.getLocationsByRegionId)
Router.post("/secured", locationController.createLocation)
Router.put("/secured", locationController.updateLocation)
Router.delete("/secured/:id", locationController.deleteLocation)
Router.get("/:id", locationController.getLocationById)

module.exports = Router;