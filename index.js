const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
//const { MongoClient  } = require('mongodb');
const MongoClient = require("mongodb").MongoClient
const app = express();

//tasks route
const tasks = require('./routes/tasks');
app.use('/api/v1/tasks', tasks);


const PORT = 3000;

// environment files excluded from git. has MongoDB user and passw
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
app.use(bodyParser.urlencoded({extended: true})) //Places form data into request body
var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath)); //Make the public folder accessible

//animations count in database variable
var animationsCount = 0;
//app.locals.animations = animations;

app.get("/", function(request, response){
  db.collection('device1').find().toArray()
    .then(data => {
      console.log('retrieved data from database')
      animationsCount = data.length
      console.log(animationsCount)
      response.render("client", {info: data})
    })
    .catch(error => console.error(error))
  //console.log('rendered' + request.originalUrl)
});


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
        //This function is too slow. O(n) plus creating strings
  /*
        //join all the function names and delays into comma separated string
        //This simplifies parsing for the arduino. not sure if fast
        //or really necessary.
        let names = delays = "";
        for(let i = 0; i < data.length; i++){
          names += data[i].name + ",";
          delays += data[i].delay + ",";
        }
       // const keys = Object.keys(data[0])
        console.log(names)
        console.log(delays)
        //Respond with the animations.
        response.json({functions: names, delay: delays});
  */
        response.json(data);
      }
    })
    .catch(error => console.error(error))

});

//404 page
app.use(function(request, response){
  response.statusCode = 404;
  response.end(404);
});

//Start server
http.createServer(app).listen(process.env.PORT || PORT, () => {
  console.log('Started server on port 3000')
});
