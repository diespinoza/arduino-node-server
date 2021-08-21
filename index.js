var express = require("express");
var http = require("http");
var logger = require("morgan");
var path = require("path");
var MongoClient = require("mongodb").MongoClient

var app = express();

//Tells express that views will be in the folder called views
app.set("views", path.resolve(__dirname, "views"));
//Tells express that EJS will be the templating engine
app.set("view engine", "ejs");

//var publicPath = path.resolve(__dirname, "public");
//app.use(express.static(publicPath));

app.use(logger("short")); //"short" returns a function

app.get("/", function(request, response){
  response.end("Hello, this is the homepage!");
});

app.get("/about", function(request, response){
  response.render("client", {
    message: "HELLO, this it my about PAGE!! :D"
  });

});

app.get("/testing", function(request, response){
  response.end("YESYESYES!");
});

app.use(function(request, response){
  response.statusCode = 404;
  response.end(404);
});

/*
app.use(function(request, response, next){
  console.log("In comes a request to: " + request.url);
  next();
});
app.use(function(request, response){
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello Worlds");
});
*/

http.createServer(app).listen(3000);
