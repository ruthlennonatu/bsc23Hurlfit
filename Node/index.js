const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const model = require("./Model/Model.js"); // path for database connection file

// Initialize App
const app = express();

app.use(cors()); //Support CORS(cross-origin resource sharing)
app.use(bodyParser.json()); // Support parsing the bodies in middleware
app.use(bodyParser.urlencoded({ extended: true }));

/*
action - either "get" or "post"
link - the link, you can put anything here - used to "connect" the html part of the app with forms
basically, you will see/type this into the searchbar at the top www.<website_name>.ie/<link>

req - what you recieve
res - what you send

app.<action>(<link>, function(req, res)){
    //code
}
*/

// Prevent favicon not found error - Replace with Icon later.
app.get("/favicon.ico", function(req, res){
    res.status(204);
});

// View for signup page - returns /Public/signup.html. Will become a signup form later.
app.get("/Signup",function(req,res){
    res.sendFile(path.join(__dirname + "/Public/signup.html"));
});

// View for homepage - returns /Public/index.html. Will become a homepage later.
app.get("/Index",function(req,res){
    res.sendFile(path.join(__dirname + "/Public/index.html"));
});

// View for booking a time - currently returns /Public/booking.html. Will become a homepage later.
app.get("/Booking",function(req,res){
    res.sendFile(path.join(__dirname + "/Public/booking.html"));
});

// Handles signing up after submitting the signup form.
/*
model name - the name of the function in Model.js
data to send - basically, whatever you want to send to the function

model.<model name>(<data to send>);
*/
app.post("/SignupSubmit",function(req,res){
    var data = req.body;
    //sends the req, res and req.body
    model.SignUp(req,res,data);
});

// Handles logging in after submitting the login form.
app.post("/LoginSubmit",function(req,res){
    var data = req.body
    console.log(data);
    //sends the req, res and req.body
    model.Login(req,res,data);
});

//--------------------------------------------------
//schedules
app.get("/Schedules", function(req, res){
    res.sendFile(path.join(__dirname+"/Public/schedules.html"));
});

app.post("/Schedules/create", function(req, res){
    //sends the req, res and req.body as its own thing
    model.ScheduleCreate(req, res, req.body);
});

app.post("/Schedules/delete", function(req, res){
    model.ScheduleDelete(req, res, req.body);
});

app.post("/Schedules/add_session", function(req, res){
    model.ScheduleSessionAdd(req, res, req.body);
});
/*
app.post("/Schedules/remove_session", function(req, res){
    model.ScheduleSessionDelete(req, res, req.body);
});
*/
//--------------------------------------------------

// Function that runs when the server starts.
app.listen(3000, function () {
    console.log("Server listening on port 3000");
});

// Handle checking the user's credientials and booking a room - proof of concept, will split into different functions later.
app.post('/checkUserCredentials', function (req, res){
    var data = req.body
    model.book(req,res,data)
});