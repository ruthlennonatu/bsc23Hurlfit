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
  } finally {
    // Close the client
    await client.close();
  }
}

// Call the async function to connect to MongoDB
connectToMongoDB();
