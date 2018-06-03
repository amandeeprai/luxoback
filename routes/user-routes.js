const express = require("express")
const Router = express.Router();
const userController = require("../controllers/user-controller");

Router.get("/admin/", userController.getAllUser)
Router.post("/", userController.createUser)
Router.put("/secured/", userController.updateUser)
Router.delete("/admin/:id", userController.deleteUser)
Router.get("/admin/:id", userController.getUserById)
Router.get("/verify/:number", userController.verifyPhoneNumber)
Router.get("/secured/fetch-user-by/:number", userController.getUserByPhoneNumber)



module.exports = Router;