const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 1337;

app.use('/', express.static(__dirname+ '/public'));

var url = "https://www.indeed.com/jobs?q=wordpress+developer&l=Austin%2C+TX";
//initislize empty array of listings
var listings = [];
//initialize ID numbers for listings
var id = 01;
//initialize empty array for related searches links
var relatedLinks = [];
//footer information
var footer = {
  title: '',
  links: []
}

request(url, function (err, resp, body) {
  var $ = cheerio.load(body);

  //this gets the information for each job listing card
  $('.result').each(function () {
    var jobTitle = $(this).find('a.turnstileLink').attr('title');
    var jobLink = "https://www.indeed.com" + $(this).find('a.turnstileLink').attr('href');
    var company = ($(this).find('.company').text());
    company = (company.replace("\n","")).trim();
    var location = ($(this).find('.location').text());
    var summary = ($(this).find('.snip .summary').text());
      summary = (summary.replace("\n","")).trim();
    var listing = {
      id: id,
      jobTitle: jobTitle,
      jobLink: jobLink,
      company: company,
      location: location,
      summary: summary
    }
    //increments the id# of each listing. Might remove ids altogether
    id++;
    //adds the listing to the listings array
    listings.push(listing);
  });


  //gets the info contained in the related links section at the bottom
  $('.related_searches_list').each(function () {

    var relatedObj = {
      title: '',
      links: []
    }
    relatedObj.title = ($(this).find('b').text().replace("\n","").trim());
    $(this).find('a').each(function () {
      var text = $(this).text().replace("\n","").trim();
      var link = 'http://www.indeed.com' + $(this).attr('href');
      var linkObj = {
        text: text,
        link: link
      }
      relatedObj.links.push(linkObj);
    });
    relatedLinks.push(relatedObj);
  });

  //getting the information from the footer
  footer.title = $('#footer').find('.gaj_heading').text();
  $('#footer').find('a').each(function () {
    var footerObj = {
      text: '',
      link: ''
    }
    footerObj.text = $(this).text();
    footerObj.link = $(this).attr('href');
    footer.links.push(footerObj);
  });
  console.log(footer);
}); //end of the request url function


//serves a default page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

//tells the app to listen and logs the port
app.listen(port, function (err) {
  if (err) {
    console.log('Disaster! Server error: '+ err)
  } else {
    console.log("You're listening to radio free Scraper on port " + port);
  }
});
