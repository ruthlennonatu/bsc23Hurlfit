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
exports.SignUp = function (req, res, data) {
    connectToMongoDB().then(
        function () {
            // Perform signup operations here
            // ...
            closeConnection(); // Close connection after operations
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
                res.send(`Login unsuccessful! Email: ${data.email}, Password: ${data.password}`);
            }
            closeConnection(); // Close connection after operations
        }
    );
}

function scheduleShow(res){
    connectToMongoDB().then(
        function (){
            const database = client.db(databaseName);

            try{
                const schedule_list = database.collection('schedules').find();
                const session_list = database.collection('sessions').find();

                //sends all info related to sessions and schedules
                //so that it can be displayed
                res.redirect('/Schedules');
                //for render();, if we use handlebars
                //, {schedules: schedule_list, sessions: session_list}
            }catch(err){
                res.status(500).json([err]);
            }

            closeConnection();
        }
    );
}

exports.ScheduleShow = function (req, res, data) {
    scheduleShow(res);
}

exports.ScheduleCreate = function (req, res, data) {
    connectToMongoDB().then(
        function (){
            try{
                const database = client.db(databaseName);

                const collection = database.collection('schedules');

                const schedule = {
                    "schedule_title":data.schedule_title,//placeholder for the title --req.body.program_title-- or program id related?
                    "schedule_type":data.schedule_type,//whether its a schedule for trainees or for the trainers
                    "monday":[],
                    "tuesday":[],
                    "wednesday":[],
                    "thursday":[],
                    "friday":[]
                };

                collection.insertOne(schedule);
            }catch(err){
                res.status(500).json([err]);
            }

            scheduleShow(res);
            closeConnection();
        }
    );
}

exports.ScheduleDelete = function (req, res, data) {
    connectToMongoDB().then(
        function (){
            try{
                const database = client.db(databaseName);
                
                database.collection('schedules').collection.deleteOne(data.schedule_id);
            }catch(err){
                res.status(500).json([err]);
            }

            scheduleShow(res);
            closeConnection();
        }
    );
}

exports.ScheduleSessionAdd = function (req, res, data) {
    connectToMongoDB().then(
        function (){
            const database = client.db(databaseName);

            const schedule = database.collection('schedules').findOne(data.schedule_id);
            schedule[data.day].push(database.collection('sessions').findOne(data.session_id));

            scheduleShow(res);
            closeConnection();
        }
    );
}

exports.ScheduleSessionDelete = function (req, res, data) {
    connectToMongoDB().then(
        function (){
            const database = client.db(databaseName);

            const collection = database.collection()

            scheduleShow(res);
            closeConnection();
        }
    );
}