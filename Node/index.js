const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const model = require("./Model/Model.js"); // path for database connection file

//Initialize App
const app = express();

app.use(cors()); //Support CORS(cross-origin resource sharing)
app.use(bodyParser.json()); // Support parsing the bodies in middleware
app.use(bodyParser.urlencoded({ extended: true }));

//this prevents favicon not found error
app.get("/favicon.ico", function(req, res){
    res.status(204);
});

//View for signup page - returns /Public/signup.html. Will become a signup form later.
app.get("/Signup",function(req,res){
    res.sendFile(path.join(__dirname + "/Public/signup.html"));
});

//View for homepage - returns /Public/index.html. Will become a homepage later.
app.get("/Index",function(req,res){
    res.sendFile(path.join(__dirname + "/Public/index.html"));
});

//View for booking a time - currently returns /Public/booking.html. Will become a homepage later.
app.get("/Booking",function(req,res){
    res.sendFile(path.join(__dirname + "/Public/booking.html"));
});

//Handles signing up after submitting the signup form.
app.post("/SignupSubmit",function(req,res){
    var data = req.body
    model.SignUp(req,res,data)
});

//Handles logging in after submitting the login form.
app.post("/LoginSubmit",function(req,res){
    var data = req.body
    console.log(data);
    model.Login(req,res,data)
});

//Function that runs when the server starts.
app.listen(3000, function () {
    console.log("Server listening on port 3000");
});

//Handle checking the user's credientials and booking a room - proof of concept, will split into different functions later.
app.post('/checkUserCredentials', function (req, res){
    var data = req.body
    model.book(req,res,data)
});