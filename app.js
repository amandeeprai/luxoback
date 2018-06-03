const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const indexRoutes = require("./routes/index")
const config = require('config');
const globalErrorHandler = require("./error-handlers/global-error-handler")
const cors = require("cors");
const mongoose = require("./config/mongodb.config")
const firebaseAuthMiddleware = require("./config/firebase.config")

let hostConfig = config.get('appConfig.hostConfig');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json())

app.use(cors())

app.use("*secured*", firebaseAuthMiddleware.verifySecuredURL)

app.use("*admin*", firebaseAuthMiddleware.verifyAdminURL)

app.use(indexRoutes)
const ejs = require('ejs');
         app.set('view engine','ejs')
         app.get('/',function (req,res) {
            res.render('pages/index')
         })
        app.get('/about',function (req,res) {
            res.render('pages/about')
         })

app.use(globalErrorHandler)

app.listen(PORT, () => {
    console.log("App server is started at port " + PORT)
})