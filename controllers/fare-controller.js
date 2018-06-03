var CustomError = require("../error-handlers/custom-error")
var FareModel = require("../models/fare.model")

createFare = (req, res, next) => {
    console.log("Create Fare called")
    let newFare = new FareModel(req.body);
    newFare.save(newFare).then(
        (data) => {
            console.log("data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("error is ", error)
            throw new CustomError("Error while creating Fare", 500)
        }
    )
}

updateFare = (req, res, next) => {
    console.log("update Fare called")

    let newFare = new FareModel(req.body);

    FareModel.findByIdAndUpdate(newFare._id, newFare).then(
        (data) => {
            console.log("data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("error is ", error)
            throw new CustomError("Error while updating Fare", 500)
        }
    )
}

getAllFare = (req, res, next) => {
    console.log("getAll Fare called")
    FareModel.find().then(
        (data) => {
            console.log("Data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while fetching all Fare", 500)
        }
    )
}

getFareById = (req, res, next) => {
    FareModel.findById(req.params.id).then(
        (data) => {
            console.log("Data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while fetching Fare by id", 500)
        }
    )
}

deleteFare = (req, res, next) => {

    console.log("delete Fare called")

    FareModel.deleteOne({ _id: req.params.id }).then(
        (data) => {
            console.log("Data is ", data)
            res.send("Fare is deleted")
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while deleting Fare by id", 500)
        }
    )
}

module.exports = {
    createFare,
    updateFare,
    getAllFare,
    getFareById,
    deleteFare
}