
module.exports = function CustomError(message, code){
    Error.captureStackTrace(this, this.constructor)
    this.message = message;
    this.code = code;
}

require('util').inherits(module.exports, Error);