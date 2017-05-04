const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 1337;

app.use('/', express.static(__dirname+ '/public'));

var functions = require('./lib/functions');
var stuff2 = require('./lib/stuff');
//var jobPage = require('./public/js/jobPage');

app.set('view engine', 'ejs');

//initislize empty array of listings
var listings = [];

//serves the default search page
app.get('/', function (req, res) {
  res.render("index");
});

//when something is searched for on the search page, gets the data from the POST
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.post('/test', urlencodedParser,  function (req, res) {
  var url = functions.urlHandler(req.body);
  //actually requests the url and retreives the relevant data from it, assigning
  //it to the empty arrays and objects above
    stuff2.dataObj(url, function(err, obj){
    if(err){ 
      return next(err) 
    };
    //sends the data to the screeeeeeeeen
    res.render('listings', {listings: obj});
  });
});

//tells the app to listen and logs the port
app.listen(port, function (err) {
  if (err) {
    console.log('Disaster! Server error: '+ err)
  } else {
    console.log("You're listening to radio free Scraper on port " + port);
  }
});
