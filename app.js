const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 1337;

var destination = fs.createWriteStream('./downloads/indeed.html')
var url = "https://www.indeed.com/jobs?q=web+developer&l=Austin%2C+TX";
request(url)
  .pipe(destination)
  .on('finish', function () {
    console.log('HTML Saved!');
  })
  .on('error', function (err) {
    console.log('Oh no! '+ err);
  })

request(url, function (err, res, body) {
  if (err) {
    console.log('All is lost! ' + err);
  } else {
    console.log(body);
  }
});


app.get('/', function (req, res) {
  res.send('Eyyy Lmao');
});

app.listen(port, function (err) {
  if (err) {
    console.log('Disaster! Server error: '+ err)
  } else {
    console.log("You're listening to radio free Scraper on port " + port);
  }
});
