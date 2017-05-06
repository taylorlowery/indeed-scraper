var request = require('request');
var cheerio = require('cheerio');
var jobPage = require('./jobPage');
var bodyParser = require('body-parser');
var functions = require('./functions');
var jobPage = require('./jobPage');

module.exports = {
    dataObj : function(link, callback) {
        request(link, function (err, resp, body) {
            var $ = cheerio.load(body);
            var id = 1;
            var dataObj = {
                listings: [],
                relatedLinks: [],
                footer : {
                    title: '',
                    links: []
                }
            }

            //this gets the information for each job listing card
            $('.result').each(function () {
                var jobTitle = $(this).find('a.turnstileLink').attr('title');
                var jobLink = $(this).find('a.turnstileLink').attr('href');
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
                functions.listingLinkCleanup(listing);
                functions.listingSummaryCleanup(listing);
                //adds the listing to the listings array


                jobPage.jobPage(listing.jobLink, function(err, obj) {
                    if (err) {
                        return next(err);
                    }
                    if (obj.fullSummary) {
                        listing.jobListing = obj.fullSummary.toString();
                    } else {
                        listing.jobListing = "flowers";
                    }
                });
                 dataObj.listings.push(listing);
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
                dataObj.relatedLinks.push(relatedObj);
            });

            //getting the information from the footer
            dataObj.footer.title = $('#footer').find('.gaj_heading').text();
            $('#footer').find('a').each(function () {
                
                var footerObj = {
                    text: '',
                    jobLink: ''
                }
                //assigns the text and the link to a footer object so that it can be replicated.
                footerObj.text = $(this).text();
                footerObj.link = ($(this).attr('href'));
                //cleans up the link
                functions.listingLinkCleanup(footerObj);
                //adds this footer link to the data object for the listings page.
                dataObj.footer.links.push(footerObj);
            });
            if (callback) callback(null, dataObj);
        }); //end of the request url function    
    }
}