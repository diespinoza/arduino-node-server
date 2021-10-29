const express = require("express");
const app = express();
// const http = require("http");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const connectDB = require('./db/connect');
//const { MongoClient  } = require('mongodb');
// const MongoClient = require("mongodb").MongoClient


// environment files. excluded from git
require('dotenv').config()

let db;
let dbConnectionStr = process.env.DB_STRING;
let dbName = 'fastled-animations'


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
var animationsCount = 0;
//animation schema
const Animation = require('./models/Animation');


app.get("/", async function(request, response){
  try{
    const animations = await Animation.find({});
//    console.log('retrieved data from database: ')
//    console.log(animations);
    // animationsCount = data.length
    response.render("client", {info: animations});

  } catch (error){

  }
});


//app.get("/", function(request, response){
//  db.collection('device1').find().toArray()
//    .then(data => {
//      console.log('retrieved data from database')
//      animationsCount = data.length
//      console.log(animationsCount)
//      response.render("client", {info: data})
//    })
//    .catch(error => console.error(error))
//  //console.log('rendered' + request.originalUrl)
//});


app.post("/addAnimation", function(request, response){
  // console.log("Check animation count:", animationsCount)
  // Check if there are too many animations
  if(animationsCount < 30){
    db.collection('device1').insertOne({name: request.body.animation,
      delay: request.body.delay})
      .then(result => {
        console.log("Animation added to db")
        response.redirect('/')
      })
      .catch(error => console.error(error))
  } else {
    console.log("too many animations")
    response.redirect('/')
  }

});

app.delete('/deleteAnimation', (request, response) => {
  console.log(request.body.animationD);
  console.log(request.body.delayD);
  db.collection('device1').deleteOne({name: request.body.animationD,
    delay: request.body.delayD})
    .then(result => {
      console.log('Animation Deleted')
      response.json('Animation Deleted')
    })
    .catch(error => console.error(error))
})

//Start of API
app.get("/api/devices/:deviceId", function(request, response){
  console.log(request.headers.host)
  const device = request.params.devideId;
  //hard coded device1 for now. Later device id will be added
  db.collection('device1').find().toArray()
    .then(data => {
      animationsCount = data.length;
      if(animationsCount === 0){
        response.json({functions: "none", delay: ""})
      } else {
        response.json(data);
      }
    })
    .catch(error => console.error(error))

});

//this page is broken
// 404 page
// app.use(function(request, response){
//   response.statusCode = 404;
//   response.end(404);
// });



//api tasks route
const animations = require('./routes/tasks');
app.use('/api/v1/animations', animations);


//function that will start the server after
//  connecting to the DB
const PORT = 3000;

const start = async () => {
  try{
    await connectDB(dbConnectionStr);
    app.listen(process.env.PORT || PORT, console.log(`server is listening on port ${PORT}...`));
  } catch(error){
    console.log(error)
  }
}


start();

//Start server
// // start when connected to db succesfully
// http.createServer(app).listen(process.env.PORT || PORT, () => {
//   console.log('Started server on port 3000')
// });
