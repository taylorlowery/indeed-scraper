
var request = require('request');
var cheerio = require('cheerio');
var functions = require('./functions.js');

module.exports = {
  //this module runs on each job listing summary and if the full listing is on indeed rather than 
  //an external site, it returns the full job summary on that listing. 
  jobPage: function(link, callback){

    var jobListing = {};

    request(link, function(err, resp, body) {
      //if the link that cheerio recieves doesn't work, it crashes, so try/catching for the jobPage data
      try { 
          var $ = cheerio.load(body);
        //if cheerio loaded successfully, this code returns the job summary data. 
        if ($) {
          var jobSummary = $('.snip .summary');
          jobListing.fullSummary = jobSummary;

          if(callback) { 
            callback(null, jobListing)
          };
        }
      }    
      catch (err) {
        console.log(err);
      }
    });
  }
}