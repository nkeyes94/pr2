
// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var exphbs = require("express-handlebars");
var express = require("express");
var mysql = require("mysql");
module.exports = function(app) {
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
  
 app.get("/", function(req, res){
   console.log("Hit the route");
   res.render("index");
 })
 app.get("/login", function(req, res){
   console.log("Hit the login route");
   res.render("login");
 });
 app.post("/login", passport.authenticate("local"), function(req, res){
   res.json(req.user);
 })
 app.get("/signup", function(req, res){
   res.render("create")
  });
   
   app.post("/signup", function(req, res){
     console.log(req.body);
     console.log("signup")
     db.User.create({
       email: req.body.email,
       password: req.body.password
     }).then(function(data){
      //  res.json(data);
       res.redirect('/profile');
     }).catch(function(err){
       console.log(err);
       res.json(err);
     })
   });
   app.get("/profile", function(req, res){
     res.render('profile');
   })
   app.get("/api/examples", function(req, res){
      console.log(req.body);
      res.end();
   })
  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  app.post("/api/saveFavorites", function(req, res){
    db.User.findOne({where: {id: 1}}).then(function(user) {
      let userFavorites = user.userFavorites || JSON.stringify([]);
      console.log(userFavorites)
      userFavorites = JSON.parse(userFavorites)
      userFavorites.push(req.body.userFavorites)
      user.update({
        userFavorites: JSON.stringify(userFavorites)
      }).then(data => res.end())
    })
  })
}
