const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 1337;

app.use('/', express.static(__dirname+ '/public'));

app.set('view engine', 'ejs');

//var url = "https://www.indeed.com/jobs?q=wordpress+developer&l=Austin%2C+TX";
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

//serves the default search page
app.get('/', function (req, res) {
  res.render("index");
});

//when something is searched for on the search page, gets the data from the POST
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.post('/test', urlencodedParser,  function (req, res) {
  //logs the POST data just for testing
  console.log(req.body.job + ', ' + req.body.location);
  //creates an indeed search page url with the data recieved from the POST
  var url = "https://www.indeed.com/jobs?q="+ req.body.job + "&l=" + req.body.location;
  //logs the new URL just to see
  console.log(url);
  //actually requests the url and retreives the relevant data from it, assigning
  //it to the empty arrays and objects above
  stuff(url, function(err, obj){
    if(err){ return next(err) };
    //res.myObj = obj;
    //for testing, supposed to send the newly populated array to the screen
    //unfortunately it does this before the objects are populated
    res.render('listings', {listings: listings});
  });

});

function stuff(link, callback) {
  request(link, function (err, resp, body) {
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
        //initializing job card object and adds the data from the above query
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
callback();
  }); //end of the request url function
}

//tells the app to listen and logs the port
app.listen(port, function (err) {
  if (err) {
    console.log('Disaster! Server error: '+ err)
  } else {
    console.log("You're listening to radio free Scraper on port " + port);
  }
});
