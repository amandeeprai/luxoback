const firebaseAdmin = require('firebase-admin');
const config = require('config');
let firebaseConfig = config.get('appConfig.firebaseConfig');

var CustomError = require("../error-handlers/custom-error")
var serviceAccount = require('./' + firebaseConfig.serviceAccountJsonFilePath);

var UserModel = require("../models/user.model")

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: firebaseConfig.dburl
});

var verifySecuredURL = (req, res, next) => {
    console.log("auth middleware is working perfectly")
    console.log(req.headers['authorization'])
    let authToken = req.headers['authorization'];
    if (!authToken) {
        throw new CustomError("Please login", 401)
    }

    firebaseAdmin.auth().verifyIdToken(authToken)
        .then((decodedToken) => {
            let uid = decodedToken.uid;
            console.log("decodeToken is ", decodedToken)
            next();
        }).catch((error) => {
            console.log("error is ", error)
            res.status(403).send(error.message)
        });
}

var verifyAdminURL = (req, res, next) => {
    console.log("admin middleware is working perfectly")
    console.log(req.headers['authorization'])
    let authToken = req.headers['authorization'];
    if (!authToken) {
        throw new CustomError("Please login", 401)
    }

    firebaseAdmin.auth().verifyIdToken(authToken)
        .then((decodedToken) => {
            let uid = decodedToken.uid;
            UserModel.findOne({ uid: uid }).then(
                    (data) => {
                        console.log("Data is ", data)
                        if (data.roles.indexOf("ROLE_ADMIN") > -1) {
                            next();
                        } else {
                            res.status(403).send("You are not authorized")
                        }
                        //res.send(data)
                    }
                ).catch(
                    (error) => {
                        console.log("Error is ", error)
                        throw new CustomError("Error while fetching User by UID", 500)
                    }
                )
                //console.log("decodeToken is ", decodedToken)
                //next();
        }).catch((error) => {
            console.log("error is ", error)
            res.status(403).send(error.message)
        });
}

module.exports = {
    verifySecuredURL,
    verifyAdminURL
}