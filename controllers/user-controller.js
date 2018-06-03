var CustomError = require("../error-handlers/custom-error")
var UserModel = require("../models/user.model")

createUser = (req, res, next) => {
    console.log("Create User called")
    let newUser = new UserModel(req.body);
    newUser.roles = ["ROLE_USER"]
    newUser.save(newUser).then(
        (data) => {
            console.log("data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("error is ", error)
            throw new CustomError("Error while creating User", 500)
        }
    )
}

updateUser = (req, res, next) => {
    console.log("update User called")

    let newUser = new UserModel(req.body);

    UserModel.findByIdAndUpdate(newUser._id, newUser).then(
        (data) => {
            console.log("data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("error is ", error)
            throw new CustomError("Error while updating User", 500)
        }
    )
}

getAllUser = (req, res, next) => {
    console.log("getAll User called")
    UserModel.find().then(
        (data) => {
            console.log("Data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while fetching all User", 500)
        }
    )
}

getUserById = (req, res, next) => {
    UserModel.findById(req.params.id).then(
        (data) => {
            console.log("Data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while fetching User by id", 500)
        }
    )
}

deleteUser = (req, res, next) => {
    console.log("delete User called")

    UserModel.deleteOne({ _id: req.params.id }).then(
        (data) => {
            console.log("Data is ", data)
            res.send("User is deleted")
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while deleting User by id", 500)
        }
    )
}

verifyPhoneNumber = (req, res, next) => {
    console.log("Verify phone number called")
    UserModel.findOne({ phoneNumber: req.params.number }).then(
        (data) => {
            console.log("data is ", data)
            if (data) {
                res.send({ exist: true })
            } else {
                res.send({ exist: false })
            }
        }
    ).catch(
        (error) => {
            console.log("error is ", error)
            throw new CustomError("Error while creating User", 500)
        }
    )
}

getUserByPhoneNumber = (req, res, next) => {
    UserModel.findOne({ phoneNumber: req.params.number }).then(
        (data) => {
            console.log("Data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while fetching User by number", 500)
        }
    )
}

module.exports = {
    createUser,
    updateUser,
    getAllUser,
    getUserById,
    deleteUser,
    verifyPhoneNumber,
    getUserByPhoneNumber
}