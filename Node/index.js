var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var path = require("path"); //not used yet or at all

var model = require("./model/model.js"); // path for database connection file

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//this prevents favicon not found error
app.get("/favicon.ico", function(req, res){
    res.status(204);
});

app.listen(3000, function () {
    console.log("Server listening on port 3000");
});