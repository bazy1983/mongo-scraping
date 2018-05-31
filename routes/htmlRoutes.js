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
        let streamId = $(".stream li:not(.ad):not(.page-marker)");
        let storyHeadline = $("h2","div.stream ol li article");
        let storySummary = $("div.stream ol li article .summary");
        let storyWriter = $("div.stream ol li article .byline");
        let storyDate = $("div.stream ol li article time");
        let img = $("div.stream ol li article img");
        let storyURL = $("div.stream ol li article a");

        for(i = 0; i< streamId.length; i++){
            
            nyTimesStream.push({
                id : streamId[i].attribs.id,
                headline : storyHeadline[i].children[0].data.trim(),
                summery : storySummary[i].children[0].data.trim(),
                writer : storyWriter[i].children[0].data.trim().slice(3), //remove "by " at the beggining
                storyDate : storyDate[i].attribs.datetime,
                img : img[i].attribs.src,
                storyURL : storyURL[i].attribs.href
            })
        }
        
        

        res.send(nyTimesStream)
    })
})

module.exports = router;