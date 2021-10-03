const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
//const { MongoClient  } = require('mongodb');
const MongoClient = require("mongodb").MongoClient
const app = express();

require('dotenv').config()

let db;
let dbConnectionStr = process.env.DB_STRING;
let dbName = 'fastled-animations'


MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
  })

/*
const client = new MongoClient(dbConnectionStr, { useNewUrlParser: true, useUnifiedTopology: true  });
client.connect(err => {
    const collection = client.db("test").collection("devices");
      // perform actions on the collection object
  //   client.close();
  //
});
*/


app.set("views", path.resolve(__dirname, "views")); //views are in folder ./views
app.set("view engine", "ejs"); //ejs is the templating engine
app.use(logger("short")); //Use Morgan for logging
app.use(bodyParser.json()) //Use JSON
app.use(bodyParser.urlencoded({extended: true})) //Places form data into body of request
var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath)); //Make the public folder accessible

//animations variable
var animations = [];
app.locals.animations = animations;

app.get("/", function(request, response){
  response.render("client")
  //response.end("Hello, this is the homepage!");
});

//remove this blynk page
app.get("/blynk", function(request, response){
  response.render("blynk");

});

app.post("/addAnimation", function(request, response){
  //recieve the request and do something with it
  console.log(request.body)
  console.log(request.body.animation)
  console.log(request.body.delay)
  response.redirect('/')
});


app.get("/neopixel", function(request, response){
  response.end("This is where you can add another strip of LEDs to controll");
});

//404 page
app.use(function(request, response){
  response.statusCode = 404;
  response.end(404);
});

//ff
//Start server
http.createServer(app).listen(3000, () => {
  console.log('Started server on port 3000')
});
