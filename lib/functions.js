module.exports = {
    urlHandler: function (obj) {
        if ((obj.job).indexOf(" ") > -1) {
            (obj.job).replace(" ", "+");
        }
        if ((obj.location).indexOf(", ")> -1) {
            (obj.location).replace(", ", "%2C+")
        }
        return "https://www.indeed.com/jobs?q="+ obj.job + "&l=" + obj.location;
    },
    listingLinkCleanup: function(obj) {
        if ((obj.jobLink).substr(0, 3) !== "http") {
            obj.jobLink = "https://www.indeed.com" + obj.link
        }
    },
    listingSummaryCleanup: function(obj) {
        if ((obj.summary).substr(obj.summary.length-3, obj.summary.length) !== "...") {
            obj.summary += "..."
        }
    },
    testLink: function(link) {
        try {cheerio.load(body)}
        catch(err) {
            res.redirect(link);
        }
    }
}