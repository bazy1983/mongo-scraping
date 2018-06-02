const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

//connect to mongodb
let mongoConnect = process.env.MONGOLAB_URI ||"mongodb://localhost/userArticle"
mongoose.connect(mongoConnect);
mongoose.Promise = global.Promise;

let port = process.env.port || 3000;

let htmlRoutes = require("./routes/htmlRoutes");
let apiRoutes = require("./routes/apiRoutes");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())

//using routes
app.use(htmlRoutes)
app.use("/api", apiRoutes)

//setup view engine to handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//serve static html css and js
app.use(express.static("public"))

app.listen(port, function(){
    console.log("Server is listening on port", port);
})