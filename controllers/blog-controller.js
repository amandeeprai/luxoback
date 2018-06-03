var CustomError = require("../error-handlers/custom-error")
var BlogModel = require("../models/blog.model")

createBlog = (req, res, next) => {
    console.log("Create Blog called")
    let newBlog = new BlogModel(req.body);
    newBlog.save(newBlog).then(
        (data) => {
            console.log("data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("error is ", error)
            throw new CustomError("Error while creating Blog", 500)
        }
    )
}

updateBlog = (req, res, next) => {
    console.log("update Blog called")

    let newBlog = new BlogModel(req.body);

    BlogModel.findByIdAndUpdate(newBlog._id, newBlog).then(
        (data) => {
            console.log("data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("error is ", error)
            throw new CustomError("Error while updating Blog", 500)
        }
    )
}

getAllBlog = (req, res, next) => {
    console.log("getAll Blog called")
    BlogModel.find().then(
        (data) => {
            console.log("Data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while fetching all Blog", 500)
        }
    )
}

getBlogById = (req, res, next) => {
    BlogModel.findById(req.params.id).then(
        (data) => {
            console.log("Data is ", data)
            res.send(data)
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while fetching Blog by id", 500)
        }
    )
}

deleteBlog = (req, res, next) => {
    console.log("delete Blog called")

    BlogModel.deleteOne({ _id: req.params.id }).then(
        (data) => {
            console.log("Data is ", data)
            res.send("Blog is deleted")
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while deleting Blog by id", 500)
        }
    )
}

module.exports = {
    createBlog,
    updateBlog,
    getAllBlog,
    getBlogById,
    deleteBlog
}