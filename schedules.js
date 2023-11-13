const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connection Successful');
});

//function, for rendering the page

//res.render('name of html or handlebar page', {'data name seen once recieved': the data you want to send, 'data name seen once recieved': the data you want to send})

//findOne
//insertOne
//deleteOne

//need to change the "time" value in sessions to "duration"
//or something which will allow me to make sure the sessions dont overlap

app.get('/schedules', () => {
    //get data from database
    let schedule_list = [];
    let session_list = [];

    sc = db.collection('schedules')
    .find()
    .sort({schedule_title:1})
    .forEach(schedule => schedule_list.push(schedule))
    .then(() => {
        res.status(200).json(schedule_list)
    })
    .catch(() => {
        res.status(500).json({error: 'Could not fetch schedules'})
    });

    se = db.collection('sessions')
    .find()
    .sort({session:1})
    .forEach(session_obj => session_list.push(session_obj))
    .then(() => {
        res.status(200).json(session_list)
    })
    .catch(() => {
        res.status(500).json({error: 'Could not fetch sessions'})
    });

    //res.redirect('schedules');
})

//creates and adds a new schedule json object into the database
app.post('/schedules/create', (req, res) => {
    //idea for the schedules,
    //eg. "tuesday":[['session_name','start_time','duration'], ['session_name','start_time','duration'], ['session_name','start_time','duration']]

    //obviously, the sessions shouldn't be able to overlap, will have to deal with that

    //can use same schedule dictionary for either trainee(user), or trainer
    const schedule = {
        "schedule_title":req.body.schedule_title,//placeholder for the title --req.body.program_title-- or program id related?
        "schedule_type":req.body.schedule_type,//whether its a schedule for trainees or for the trainers
        "monday":[],
        "tuesday":[],
        "wednesday":[],
        "thursday":[],
        "friday":[]
    };

    db.collection('schedules')
    .insertOne(schedule)
    .then(result => res.status(201).json(result))
    .catch(err => {res.status(500).json([err])});

    //res.redirect('schedules');
});

//delets a schedule json object from the database 
app.delete('/schedules/delete/:id', (req, res) =>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('schedules')
        .deleteOne({_id: ObjectID(req.params.id)})
        .then(result => res.status(200).json(result))
        .catch(err => {res.status(500).json([err])});
    }
    else{
        res.status(500).json({error: 'ID not valid'});
    }

    //res.redirect('schedules');
});

//adds a session to a specific schedule
app.post('/schedule/add-session/:id', (req, res) => {
    //add a training session to the ___ schedule

    //get the schedule
    

    //check if the time overlaps

    //add

    //return schedule to database


    //res.redirect('schedules');
});

//removes a session from a specific schedule
app.delete('/schedule/delete-session/:id', (req, res) => {
    //delete a training session from the ___ schedule


    //res.redirect('schedules');
});


/*
app.post('/schedule-edit-session', (req, res) => {
    //edit a training session in the ___ schedule
});

app.post('', (req, res) => {

});
*/