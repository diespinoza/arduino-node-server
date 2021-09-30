var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var logger = require("morgan");
var path = require("path");
//var MongoClient = require("mongodb").MongoClient
var app = express();

//Tells express that EJS will be the templating engine
app.set("view engine", "ejs");
//Tells express that views will be in the folder called views
app.set("views", path.resolve(__dirname, "views"));
//Tells express to use morgan for logging
app.use(logger("short")); //"short" returns a function
//Tells express to use json
app.use(bodyParser.json())
//Tells express to serve make the public folder accessible
var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

//animations variable
var animations = [];
app.locals.animations = animations;

app.get("/", function(request, response){
  response.render("client")
  //response.end("Hello, this is the homepage!");
});

app.get("/blynk", function(request, response){
  response.render("blynk");

});

app.post("/blynk/api", function(request, response){
  //recieve the request and do something with it

});


app.get("/neopixel", function(request, response){
  response.end("This is where you can add another strip of LEDs to controll");
});

//404 page
app.use(function(request, response){
  response.statusCode = 404;
  response.end(404);
});

//Start server
http.createServer(app).listen(3000, () => {
  console.log('Started server on port 3000')
});
