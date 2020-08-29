const mongoose = require('mongoose');
const env = require('./env');
const dbURL = env.configVars.dbURL;

function conn(){
  mongoose.connect(dbURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
  }, function (err) {
   if (err){
    console.log("Error occured while connecting to the database. "+err);
   }
   console.log('Successfully connected to MongoDB database');
  });
}

module.exports = {conn};