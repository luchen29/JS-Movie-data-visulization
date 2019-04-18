var express = require("express");
var app = express();
var mongo = require("mongodb");
var mongoose = require("mongoose");
var assert = require("assert");
var User = require('./models/users');
var Movies = require('./models/movies');
var bodyParser = require('body-parser');
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//create a middleware run for every single route
app.use(function(req, res, next){
   res.locals.currentUser = req.User;
   next();
});

mongoose.connect("mongodb://localhost/moviedb")
var db = mongoose.connection;
// show the database has been successfully connected
db.on('open', function(){
    console.log('MongoDB Connection Successed');
});



//Route - landing page
app.get("/",function(req,res){
    res.render("landing");
});

//Route - Data visualizing page
app.get("/visual",function(req,res){
    res.sendFile(__dirname + "/visual.html");
});

//Route - render login page
app.get('/login', function (req, res) {
    res.render('login');
});

//Route - render logout page
app.get("/logout",function (req,res){
    req.logout();
    res.redirect("/");
});

//Route - render register page
app.get('/register', function (req, res) {
    res.render('register');
});

//Route - render all movies page
app.get('/search', function (req, res) {
    Movies.find({"rating_count":{"$gt":100}}).limit(40).sort('-rating_avg').exec(function(err, allMovies){
       if(err){
           console.log(err);
       } else {
           res.render("search2",{movies:allMovies});
       }
    });
});

//define a function to check if currently is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//Route - User Profile Page
app.get('/useraccount', isLoggedIn, function (req, res) {
    res.render('useraccount',{currentUser:req.user});
});


//Route - user register
app.post('/register', function (req, res) {
    var newUser = new User ({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/useraccount");});
        });
});

//Route - login (middleware-check the password)
app.post("/login", passport.authenticate("local", {
    successRedirect: "/useraccount",
    failureRedirect: "/login"}) ,function(req, res){
});

// get all the registered user--> for testing
app.get('/userList', function (req, res) {
    var userList = User.find({}, function (err, data) {
        if (err) throw  err;
        res.send(data)
    });
});


//listen
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie has started!");
});

