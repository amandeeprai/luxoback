const mongoose = require('mongoose');
const config = require('config');

let dbConfig = config.get('appConfig.dbConfig');

mongoose.connect(dbConfig.url);

const db = mongoose.connection;

db.on('error', ()=>{ console.log("error while creating mongodb connection") })

db.once('open', ()=> { console.log("MongoDB connection is created") })

module.exports = mongoose;