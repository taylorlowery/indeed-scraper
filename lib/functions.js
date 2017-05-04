module.exports = {
    urlHandler: function (obj) {
        //handles spaces in the job title field
        if ((obj.job).indexOf(" ") > -1) {
            (obj.job).replace(" ", "+");
        }
        //handles commas in the location field
        if ((obj.location).indexOf(" ") > -1) {
            (obj.location).replace(" ", "+");
        }
        //handles spaces and commas in the location field
        if ((obj.location).indexOf(",")> -1) {
            (obj.location).replace(",", "%2C")
        }
        //creates a url with the job and location text
        return "https://www.indeed.com/jobs?q="+ obj.job + "&l=" + obj.location;
    },
    listingLinkCleanup: function(obj) {
        //detects relative paths by checking for http at beginning of link
        if ((obj.jobLink).substr(0, 3) !== "http") {
            //adds the objective path to beginning of relative url
            obj.jobLink = "https://www.indeed.com" + obj.jobLink;
            
        }
    },
    listingSummaryCleanup: function(obj) {
        //checks to see if there's an ellipsis at the end of the summary and if not, adds it
        if ((obj.summary).substr(obj.summary.length-3, obj.summary.length) !== "...") {
            obj.summary += "..."
        }
    },
    //initially written to see if the link led to indeed or another site. 
    //currently not in use.
    testLink: function(link) {
        //this crashes if the next page isn't on indeed,
        //due to a quirk in cheerio
        try {cheerio.load(body)}
        catch(err) {
            //if it's not on indeed, sends the user straight there. 
            res.redirect(link);
        }
    }
}