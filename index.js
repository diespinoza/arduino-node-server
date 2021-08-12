var express = require("express");
var http = require("http");

var app = express();

app.use(function(request, response, next){
  console.log("In comes a request to: " + request.url);
  next();
});

app.use(function(request, response){
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello Worlds");
});

http.createServer(app).listen(3000);
