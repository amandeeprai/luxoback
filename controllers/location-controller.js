var CustomError = require("../error-handlers/custom-error")
var LocationModel = require("../models/location.model")
var APP_CONSTANTS = require("../constants/app-constants")

createLocation = (req, res, next) => {
    console.log("Create Location called")
    let newLocation = new LocationModel(req.body);
    newLocation.save(newLocation).then(
        (data) => {
            console.log("data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("error is ", error)
            throw new CustomError("Error while creating Location", 500)
        }
    )
}

updateLocation = (req, res, next) => {
    console.log("update Location called")

    let newLocation = new LocationModel(req.body);

    LocationModel.findByIdAndUpdate(newLocation._id, newLocation).then(
        (data) => {
            console.log("data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("error is ", error)
            throw new CustomError("Error while updating Location", 500)
        }
    )
}

getAllLocation = (req, res, next) => {
    console.log("getAll Location called")
    LocationModel.find({ type: APP_CONSTANTS.LOCATION_TYPE }).then(
        (data) => {
            console.log("Data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while fetching all Location", 500)
        }
    )
}

getLocationById = (req, res, next) => {
    LocationModel.find({ type: APP_CONSTANTS.LOCATION_TYPE, _id: req.params.id }).then(
        (data) => {
            console.log("Data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while fetching Location by id", 500)
        }
    )
}

deleteLocation = (req, res, next) => {
    console.log("delete Location called")

    LocationModel.deleteOne({ _id: req.params.id }).then(
        (data) => {
            console.log("Data is ", data)
            res.send("Location is deleted")
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while deleting Location by id", 500)
        }
    )
}

getLocationsByRegionId = (req, res, next) => {
    LocationModel.find({ 'regionId': req.params.regionId }).then(
        (data) => {
            console.log("Data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while fetching Location by region id", 500)
        }
    )
}

module.exports = {
    createLocation,
    updateLocation,
    getAllLocation,
    getLocationById,
    deleteLocation,
    getLocationsByRegionId
}