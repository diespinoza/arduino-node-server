var express = require("express");
var http = require("http");
var logger = require("morgan");
var path = require("path");

var app = express();

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.use(logger("short")); //"short" returns a function

app.get("/", function(request, response){
  response.end("Hello, this is the homepage!");
});

app.get("/about", function(request, response){
  response.end("Hello, about page!");
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
