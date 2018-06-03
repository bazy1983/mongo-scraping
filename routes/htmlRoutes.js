const express = require("express");
const router = express.Router();
const cheerio = require("cheerio");
const request = require("request");

let url = "https://www.nytimes.com/section/us?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=U.S.&WT.nav=page";

router.get("/", function(req, res){
    var nyTimesStream = [];
    
    //get latest news from new york times
    request(url, function(err, response, body){
        if (err) console.log(err);
        let $ = cheerio.load(body, {
            normalizeWhitespace: true,
            xmlMode: true
        })
        let stream = $(".stream li:not(.ad):not(.page-marker)");
        stream.each(function(i, item){
            nyTimesStream.push({
                id : $(item).attr("id"),
                headline : $(item).children().children(".story-body").children().children(".story-meta").children("h2").text().trim(),
                summary : $(item).children().children(".story-body").children().children(".story-meta").children(".summary").text().trim(),
                storyDate : $(item).children().children(".story-footer").children().text().trim(),
                img : $(item).children().children(".story-body").children().children(".wide-thumb").children().attr("src"),
                storyURL : $(item).children().children(".story-body").children().attr("href"),
                author : $(item).children().children(".story-body").children().children(".story-meta").children(".byline").text().trim()
            })
        
        })
        
        

        res.render("index", {stories : nyTimesStream})
    })
})

module.exports = router;