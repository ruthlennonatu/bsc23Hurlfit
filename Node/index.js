const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const model = require("./Model/Model.js"); // path for database connection file

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//this prevents favicon not found error

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

app.listen(3000, function () {
    console.log("Server listening on port 3000");
});

app.post('/checkUserCredentials', function (req, res){
    var data = req.body
    model.book(req,res,data)
});