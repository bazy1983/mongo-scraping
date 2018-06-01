var express = require("express");
var router = express.Router();
var Article = require("../models/articles")

router.get("/", function(req, res){
    res.send("okay")
})

router.post("/addArticle", function(req, res){
    Article.create(req.body)
    .then(function(data){
        res.send(data)
    })
    .catch(function(err){
        console.log(err);
        res.status(403).end()
    })

})



module.exports = router