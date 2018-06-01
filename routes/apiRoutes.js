var express = require("express");
var router = express.Router();
var Article = require("../models/articles")

router.get("/", function(req, res){
    res.send("okay")
})

router.post("/addArticle", function(req, res){
    Article.create(req.body)
    .then(function(results){
        res.send(results)
    })
    .catch(function(err){
        console.log("saving new Article went wrong!")
        console.log(err);
        res.status(403).end()
    })
})

router.get("/getArticles", function(req, res){
    Article.find()
    .then(function(results){
        res.send(results)
    })
    .catch(function(err){
        console.log("GET all articles unsuccessful!")
        console.log(err)
        res.status(404).end()
    })
})


module.exports = router