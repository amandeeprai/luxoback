const express = require("express")
const Router = express.Router();
const regionController = require("../controllers/region-controller");

Router.get("/", regionController.getAllRegion)
Router.post("/secured", regionController.createRegion)
Router.put("/secured", regionController.updateRegion)
Router.delete("/secured/:id", regionController.deleteRegion)
Router.get("/:id", regionController.getRegionById)

module.exports = Router;