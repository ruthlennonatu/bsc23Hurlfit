const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.static("express"));

// default URL for website
app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/express/home2.html'));
    //__dirname : It will resolve to your project folder.
  });

//view schedules homepage.
app.use('/schedules', function(req,res){
    res.sendFile(path.join(__dirname+'/express/schedules.html'));
    //__dirname : It will resolve to your project folder.
  });

//Login information here; should be a template later on.
app.use('/login', function(req, res) {
    res.sendFile(path.join(__dirname+'/express/login.html'))
  });

  
/*****************************************
For oskar to put his code into when ready.
******************************************/
app.post('/schedules/create', (req, res) => {});
app.post('/schedules/delete', (req, res) => {});
app.post('/schedules/add-session', (req, res) => {});
app.post('/schedules/delete-session', (req, res) => {});


const server = http.createServer(app);

server.listen(PORT);

