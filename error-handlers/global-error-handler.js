globalErrorHandler = (error, req, res, next) => {
    console.log("error is hello ")

    res.status(error.code);
    res.send(error.message);
}

module.exports = globalErrorHandler;