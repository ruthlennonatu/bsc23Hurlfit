const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const model = require("./Model/model.js"); // path for database connection file

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//this prevents favicon not found error
app.get("/favicon.ico", function(req, res){
    res.status(204);
});

app.get("/Signup",function(req,res){
    res.sendFile(path.join(__dirname + "/Public/signup.html"));
});

app.get("/Index",function(req,res){
    res.sendFile(path.join(__dirname + "/Public/index.html"));
});

app.get("/Booking",function(req,res){
    res.sendFile(path.join(__dirname + "/Public/booking.html"));
});

app.post("/SignupSubmit",function(req,res){
    var data = req.body
    model.SignUp(req,res,data)
});

app.post("/LoginSubmit",function(req,res){
    var data = req.body
    console.log(data);
    model.Login(req,res,data)
});

app.listen(3000, function () {
    console.log("Server listening on port 3000");
});