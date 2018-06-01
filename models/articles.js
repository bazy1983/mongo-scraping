var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//create user schema and model
var ArticleSchema = new Schema({ 
    articleID : {
        type : String,
        required : [true, "Article id is required"],
        unique : true
    },
    headline : {
        type : String
    },
    url : {
        type : String
    },
    summary : {
        type : String
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    image : {
        type : String,
    },
    hasComment : {
        type : Boolean,
        default : false
    },
    comment : {
        type : String,
        default : ""
    }
});

var Article = mongoose.model("article", ArticleSchema)

module.exports = Article;