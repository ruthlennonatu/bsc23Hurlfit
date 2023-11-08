const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connection Successful');
});


db.post('/create-schedule', (req, res) => {
    //create new schedule
    //title
    //trainer
    //day1
    //day2
    //...
    //day5(or till day7, depends on if weekends are included)

    //idea for the schedules,
    //eg. "tuesday":[['session_name','start_time','duration'], ['session_name','start_time','duration'], ['session_name','start_time','duration']]

    //obviously, the sessions shouldn't be able to overlap, will have to deal with that

    //trainee(user) schedule
    const schedule = {
        "program_title":"temp_program_title",//placeholder for the title --req.body.program_title-- or program id related?
        "trainer_name":"temp_trainer_name",//placeholder for the name --req.body.trainer_name-- or trainer id related?
        "monday":[],
        "tuesday":[],
        "wednesday":[],
        "thursday":[],
        "friday":[]
    }

    db.collection('schedules')
    .insertOne(schedule)
    .then(result => res.status(201).json(result))
    .catch(err => {res.status(500).json([err])})
});



db.post('/schedule-add-session', (req, res) => {
    //add a training session to the ___ schedule
});

db.post('/schedule-edit-session', (req, res) => {
    //edit a training session in the ___ schedule
});

db.post('/schedule-delete-session', (req, res) => {
    //delete a training session from the ___ schedule
})

/*
db.post('', (req, res) => {

});
*/