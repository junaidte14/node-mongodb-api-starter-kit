const mongoose = require('mongoose');
const env = require('./env');
const dbURL = env.configVars.dbURL;

const conn = async (res, next) => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useCreateIndex: true
    });
    next();
  } catch (error) {
    res.status(500).send('Error connecting to the database!');
  }
}

module.exports = {conn};