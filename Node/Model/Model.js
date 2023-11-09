// Import the MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI for local MongoDB instance
const uri = 'mongodb://localhost:27017'; 

// Database Name
const databaseName = 'hurling'; 
// Create a new MongoClient
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');    
  } catch (err) {
    console.error('Error occurred while connecting to MongoDB:', err);
  }
}

async function closeConnection(){
    await client.close();
}

//these are the only two needed so far 
exports.SignUp = function(res,req,data){
    connectToMongoDB().then(
        function(){
            //do query here
        }
    );

    closeConnection();
}


exports.Login = function(res,req,data){
    connectToMongoDB().then(
        function(){
            //do query here
            //needs to return some kind ok okay respose to let user log in 
        }
    );

    closeConnection();
}