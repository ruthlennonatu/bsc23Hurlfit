// Import the MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI for local MongoDB instance
const uri = 'mongodb://localhost:27017/';

// Database Name
const databaseName = 'hurling';

// Create a new MongoClient
const client = new MongoClient(uri);

// Collection Name
const collectionName = 'users';

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
    } catch (err) {
        console.error('Error occurred while connecting to MongoDB:', err);
    }
}

async function closeConnection() {
    //put this code here instead, because await client.close(); didnt work for me
    setTimeout(() => {client.close()}, 1500);
}

// Signup function
exports.SignUp = function (req, res) {
    connectToMongoDB().then(
        async function () {
            try {
                const database = client.db(databaseName);
                const collection = database.collection(collectionName);

                // Extract user data from request body
                const userData = {
                    firstName: req.body.FirstName,
                    lastName: req.body.LastName,
                    email: req.body.Email,
                    password: req.body.Password,
                    gender: req.body.Gender,
                    dateOfBirth: req.body.Date
                };

                // Insert user data into the collection
                const result = await collection.insertOne(userData);

                if (result.acknowledged) {
                    // Redirect or send a success response
                    res.redirect('/Booking'); // Redirect to the homepage
                } else {
                    // Handle sign up failure
                    res.send(400);
                }
            } catch (err) {
                console.error('Error during signup:', err);
                res.send(400);
            } finally {
                closeConnection(); // Close connection after operations
            }
        }
    );
}

// Login function
exports.Login = function (req, res, data) {
    connectToMongoDB().then(
        async function () {
            const database = client.db(databaseName);
            // Access the collection
            const collection = database.collection(collectionName);
            const user = await collection.findOne(data);
            if (user) {
                // Redirect to the homepage on successful login
                res.redirect('/Booking');
            } else {
                // Display login unsuccessful message
                res.status(400);
                res.send(`Login unsuccessful! Email: ${data.email}, Password: ${data.password}`);
                
            }
            closeConnection(); // Close connection after operations
        }
    );
}

//function that can get all of the 
function scheduleShow(res){
    connectToMongoDB().then(
        function (){
            //gets the database ready, so that you don't have to do "client.db(databaseName)" when performing actions related to MongoDB
            const database = client.db(databaseName);//databaseName = the name of the database, as the name suggests

            try{
                //think of collections as list, or a "collection" of json files... which are basically dictionaries
                const schedule_list = database.collection('schedules').find();//gets all objects in the "schedules" collection
                const session_list = database.collection('sessions').find();//gets all objects in the "sessions" collection

                //brings up the "Schedules" page - The name is based on the one in "index.js"
                res.redirect('/Schedules');

            }catch(err){
                res.status(500).json([err]);
            }
            //closeConnection();
        }
    );
}

exports.ScheduleShow = function (req, res, data) {
    scheduleShow(res);
}

//creates schedules
exports.ScheduleCreate = function (req, res, data) {
    connectToMongoDB().then(
        function (){
            try{
                const database = client.db(databaseName);

                const collection = database.collection('schedules');//gets all objects in the "schedules" collection

                //All arrays with named after a weekday are empty when the schedule is created
                //so that 
                const schedule = {
                    "schedule_title":data.schedule_title,//placeholder for the title --req.body.program_title-- or program id related?
                    "schedule_type":data.schedule_type,//whether its a schedule for trainees or for the trainers
                    "monday":[],
                    "tuesday":[],
                    "wednesday":[],
                    "thursday":[],
                    "friday":[]
                };

                collection.insertOne(schedule);//adds the dictionary to the database, 
            }catch(err){
                res.status(500).json([err]);
            }

            scheduleShow(res);
            closeConnection();
        }
    );
}

//deletes schedules by id
exports.ScheduleDelete = function (req, res, data) {
    connectToMongoDB().then(
        function (){
            try{
                const database = client.db(databaseName);

                //deletes the first json it comes across
                database.collection('schedules').deleteOne({title: data.schedule_title});//({title: data.schedule_title}) can be replaced with ({_id: data.schedule_id})

            }catch(err){
                res.status(500).json([err]);
            }

            scheduleShow(res);
            closeConnection();
        }
    );
}

//adds sessions to schedules
exports.ScheduleSessionAdd = function (req, res, data) {
    connectToMongoDB().then(
        function (){
            const database = client.db(databaseName);
            
            
            const schedule = database.collection('schedules').findOne({title: data.schedule_title});//finds the first json it comes across with that exact name


            /*
                Code that checks whether the session overlaps with other schedules on that day, at that time.
            */

            //example of creating the session dictionary
            const newSession = {
                //gets the session - for now by title, but can be changed to 
                "session": database.collection('sessions').findOne({title: data.session_title}),
                "start_time":data.time,//time - Text input instead of Datetime, at the moment.
                "duration":data.duration//duration - integer, minutes
            }

            //adds the session to the schedule
            schedule[data.day].push(newSession);

            scheduleShow(res);
            closeConnection();
        }
    );
}

//removes sessions from schedules
exports.ScheduleSessionDelete = function (req, res, data) {
    connectToMongoDB().then(
        function (){
            const database = client.db(databaseName);

            const collection = database.collection('schedules');

            /*
                Code for deleting the specific sessions from the schedules collection 
            */

            scheduleShow(res);
            closeConnection();
        }
    );
}

// Booking function
exports.book = function (req, res, data) {
    connectToMongoDB().then(
        async function () {
            const database = client.db(databaseName);
            // Access the collection
            const collection = database.collection(collectionName);
            const user = await collection.findOne(data);
            res.json({ exists: user != null });
            if (user) {
                console.log("Valid User");
            } else {
                console.log("Invalid User");
            }
        }
    );
}

