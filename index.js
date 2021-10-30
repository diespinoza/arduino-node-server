const express = require("express");
const app = express();
// const http = require("http");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const connectDB = require('./db/connect');

// environment files. excluded from git
require('dotenv').config()


app.set("views", path.resolve(__dirname, "views")); //views are in folder ./views
app.set("view engine", "ejs"); //ejs is the templating engine
app.use(logger("short")); //Use Morgan for logging

//removing body parser use express intead. Used json in body of req
// app.use(express.json());
app.use(bodyParser.json()) //Use JSON
app.use(bodyParser.urlencoded({extended: true}))

//Make the public folder accessible
var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

//animations count in database variable
// var animationsCount = 0;
//animation schema
const Animation = require('./models/Animation');


app.get("/", async function(request, response){
  try{
    const animations = await Animation.find({});
//    console.log('retrieved data from database: ')
    // console.log(animations);
    // animationsCount = data.length
    response.render("client", {info: animations});

  } catch (error){
    console.log(error);
  }
});


//api tasks route
const animations = require('./routes/tasks');
app.use('/api/v1/animations', animations);


const PORT = 3000;
let dbConnectionStr = process.env.DB_STRING;

//start the server after connecting to DB
const start = async () => {
  try{
    await connectDB(dbConnectionStr);
    app.listen(process.env.PORT || PORT, console.log(`server is listening on port ${PORT}...`));
  } catch(error){
    console.log(error)
  }
}


start();
