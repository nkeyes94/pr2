// * Import the packages required for the server
var express = require("express");
var session = require("express-session");
var app = express();
var mysql = require("mysql");
var db = require("./models")
var passport = require("./config/passport");

// * Middleware config
app.use(express.urlencoded( { extended: false } ));
app.use(express.json());
app.use(express.static("public"));

// * Passport config
app.use(session({ secret: "this is a secret", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// * Require the routes
const routes = require("./routes/users.js")(app);
const routeTwo = require("./routes/api-routes")(app);
// const routeThree = require("./routes/index")(app);

// * Port config
var PORT = process.env.PORT || 8080;

// * Server listener
db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log("App listening on localhost:"+ PORT);
    });
});