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

router.delete("/deleteArticle", function(req, res){
    Article.deleteOne(req.body)
    .then(function(){
        res.status(200).end();
    })
    .catch(function(err){
        console.log("couldn't save new comment")
        console.log(err)
    })

})

router.put("/comment", function(req, res){
    Article.updateOne({
        articleID : req.body.articleID
    },{
        hasComment : true,
        comment : req.body.comment
    })
    .then(function(){
        res.status(200).end();
    })
    .catch(function(err){
        console.log("adding new comment not successful");
        console.log(err);
    })
})

router.delete("/deleteComment", function(req, res){
    Article.updateOne(req.body, {
        comment : "",
        hasComment : false
    })
    .then(function(){
        res.status(200).end()
    })
    .catch(function(err){
        console.log("something went wrong while removing comment");
        console.log(err)
    })
})


module.exports = router