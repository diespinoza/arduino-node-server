//Connect to the database
const mongoose = require('mongoose');

const connectDB = (url) => {
  console.log('connect to DB from db folder')
  return mongoose.connect(url)
}

module.exports = connectDB
