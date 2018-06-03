var CustomError = require("../error-handlers/custom-error")
var RegionModel = require("../models/region.model")
var APP_CONSTANTS = require("../constants/app-constants")

createRegion = (req, res, next) => {
    console.log("Create Region called")
    let newRegion = new RegionModel(req.body);
    newRegion.save(newRegion).then(
        (data) => {
            console.log("data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("error is ", error)
            throw new CustomError("Error while creating Region", 500)
        }
    )
}

updateRegion = (req, res, next) => {
    console.log("update Region called")

    let newRegion = new RegionModel(req.body);

    RegionModel.findByIdAndUpdate(newRegion._id, newRegion).then(
        (data) => {
            console.log("data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("error is ", error)
            throw new CustomError("Error while updating Region", 500)
        }
    )
}

getAllRegion = (req, res, next) => {
    console.log("getAll Region called and region type is ", APP_CONSTANTS)
    RegionModel.find({ "type": APP_CONSTANTS.REGION_TYPE }).then(
        (data) => {
            console.log("Data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while fetching all Region", 500)
        }
    )
}

getRegionById = (req, res, next) => {
    RegionModel.find({ type: APP_CONSTANTS.REGION_TYPE, _id: req.params.id }).then(
        (data) => {
            console.log("Data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while fetching Region by id", 500)
        }
    )
}

deleteRegion = (req, res, next) => {
    console.log("delete Region called")

    RegionModel.deleteOne({ _id: req.params.id }).then(
        (data) => {
            console.log("Data is ", data)
            res.send("Region is deleted")
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while deleting Region by id", 500)
        }
    )
}

module.exports = {
    createRegion,
    updateRegion,
    getAllRegion,
    getRegionById,
    deleteRegion
}