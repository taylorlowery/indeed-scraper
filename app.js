const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 1337;

app.use('/', express.static(__dirname+ '/public'));

var url = "https://www.indeed.com/jobs?q=wordpress+developer&l=Austin%2C+TX";
var listings = [];
id = 1;

request(url, function (err, resp, body) {
  var $ = cheerio.load(body);
  console.log($('.result').length);
  $('.result').each(function () {

    var jobTitle = $(this).find('.jobtitle').attr('title');
    var company = $(this).find('.company a').text();

    var listing = {
      id: id,
      jobTitle : jobTitle,
      company : company
    }
    id++;
    listings.push(listing);
  });
  console.log(listings);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, function (err) {
  if (err) {
    console.log('Disaster! Server error: '+ err)
  } else {
    console.log("You're listening to radio free Scraper on port " + port);
  }
});
