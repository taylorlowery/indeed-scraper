
var request = require('request');
var cheerio = require('cheerio');
var functions = require('./functions.js');

module.exports = {

  jobPage: function(link, callback){

    var jobListing = {
        
      }
    request(link, function(err, resp, body) {
    try { 
        var $ = cheerio.load(body);
        
     if ($) {
      
      var jobSummary = $('.snip .summary');
      jobListing.fullSummary = jobSummary;
      //console.log(jobSummary);
      
      //selecting the main elements in recommend jobs and saving as separate objects
      // $('.recJobs').find('a').each(function () {
      //   var recJobTitle  = $(this).text();
      //   var recJobLink = 'https://www.indeed.com' + $(this).attr('href');
      //   var recJobCompany = $(this).next().next('.company').text();
      //   var recJobLocation = $(this).next().next('.company').next('.location').text();
      //   recJob = {
      //     recJobTitle : recJobTitle,
      //     recJobLink : recJobLink,
      //     recJobCompany: recJobCompany,
      //     recJobLocation: recJobLocation
      //   }
      //   jobListing.recJobs.push(recJob);
      // });
      //console.log("hey " + jobListing.job.jubSummary);
      //console.log(recJobs);
      //console.log("yo " + jobSummary)
      if(callback) { callback(null, jobListing)};
    }
      }    
    catch (err){
      console.log(err);
     }
     
     });
  }
}