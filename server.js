const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
let port = process.env.port || 3000;

let htmlRoutes = require("./routes/htmlRoutes")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())

//using routes
app.use(htmlRoutes)

//setup view engine to handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//serve static html css and js
app.use(express.static("public"))

app.listen(port, function(){
    console.log("Server is listening on port", port);
})