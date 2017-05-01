
var request = require('request');
var cheerio = require('cheerio');

module.exports = {


  jobPage: function(link){
    request(url, function (err, resp, body) {
      var jobListing = {
        job:{},
        recJobs: []
      }
      var $ = cheerio.load(body);
      //selecting main job elements
      var jobTitle = $('[data-tn-component] .jobtitle font').text();
      var company = $('[data-tn-component] .company').text()
      var location = $('[data-tn-component] .location').text();
      var jobSummary = $('#job_summary').text();

      //declaring the job object and assigning its keys the above values
      jobListing.job = {
        jobTitle : jobTitle,
        company: company,
        location: location,
        jobSummary: jobSummary
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
        jobListing.recJobs.push(recJob);
      });
      //console.log(job);
      console.log(recJobs);
    });

    return jobListing;
  }  
}
