const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 1337;

app.use('/', express.static(__dirname+ '/public'));


var recJobs = [];

var destination = fs.createWriteStream('./downloads/indeed.html')
//for practice purposes, this goes to a specific job
var url = "https://www.indeed.com/viewjob?jk=4749d6552c5748d5&q=wordpress+developer&l=Austin%2C+TX&tk=1be6dns17b8mpck5&from=web&advn=3066145960454562&sjdu=QwrRXKrqZ3CNX5W-O9jEvQIRfhRcze5dUvqrRHhxhD10CcWZOUlHoe3eny0tgNhSDPIgbmQrkEJerYDokk8g2zQ2b9Il319ZICwwVIqdchs&pub=4a1b367933fd867b19b072952f68dceb";
request(url, function (err, resp, body) {
  var $ = cheerio.load(body);
  //selecting main job elements
  var jobTitle = $('[data-tn-component] .jobtitle font').text();
  //.find('.jobtitle font').text();
  var company = $('[data-tn-component] .company').text()
  var location = $('[data-tn-component] .location').text();
  var jobSummary = $('#job_summary').html();

  //declaring the job object and assigning its keys the above values
  var job = {
    jobTitle : jobTitle,
    company: company,
    location: location,
    //jobSummary: jobSummary
  }

  //selecting the main elements in recommend jobs and saving as separate objects
  $('.recJobs').find('a').each(function () {
    var recJobTitle  = $(this).text();
    var recJobLink = 'https://www.indeed.com' + $(this).attr('href');
    var recJobCompany = $(this).next().next('.company').text();
    var recJobLocation = $(this).next().next('.company').next('.location').text();
    recJob = {
      recJobTitle : recJobTitle,
      recJobLink : recJobLink,
      recJobCompany: recJobCompany,
      recJobLocation: recJobLocation
    }
    recJobs.push(recJob);
  });
  //console.log(job);
  console.log(recJobs);
})

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
