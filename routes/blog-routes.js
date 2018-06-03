const express = require("express")
const Router = express.Router();
const blogController = require("../controllers/blog-controller");

Router.get("/", blogController.getAllBlog)
Router.post("/", blogController.createBlog)
Router.put("/", blogController.updateBlog)
Router.delete("/:id", blogController.deleteBlog)
Router.get("/:id", blogController.getBlogById)

module.exports = Router;