const mongoose = require("mongoose");
const schedule = require("./scheduleSchemaTest");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//the problem I'm having is that I just can't connect
//idk why
mongoose.connect("mongodb://127.0.0.1:27017/testdb");


app.post('/schedules/create', (req, res) => {
    //idea for the schedules,
    //eg. "tuesday":[['session_name','start_time','duration'], ['session_name','start_time','duration'], ['session_name','start_time','duration']]

    //obviously, the sessions shouldn't be able to overlap, will have to deal with that

    //can use same schedule dictionary for either trainee(user), or trainer
    const schedule = new Schedule({
        title: req.body.schedule_title,//placeholder for the title --req.body.program_title-- or program id related?
        type: req.body.schedule_type,//whether its a schedule for trainees or for the trainers
        monday:[],
        tuesday:[],
        wednesday:[],
        thursday:[],
        friday:[]
    });

    schedule.save()

    //res.redirect('/schedules');
});

//delets a schedule json object from the database 
app.post('/schedules/delete/:id', (req, res) =>{
    
    schedule.deleteOne(req.params.id);

    //res.redirect('/schedules');
});

app.post('/schedule/add-session/:schedule_id+:session_id+:day', (req, res) => {
    //add a training session to the ___ schedule

    //get the schedule and the session
    let schedule = schedule.findOne(req.params.schedule_id);
    let session = session.findOne(req.params.session_id);

    //check if the time overlaps(do later) and add it to the schedule

    //mongoose version of - schedule[req.params.day].push(session);


    schedule.save();

    //res.redirect('/schedules');
});

//removes a session from a specific schedule
app.delete('/schedule/delete-session/:schedule_id+:session_id', (req, res) => {
    //delete a training session from the ___ schedule

    //get the schedule
    
    //delete the session from the schedule


    //res.redirect('schedules');
});
