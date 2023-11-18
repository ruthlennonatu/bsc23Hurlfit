// Import the MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI for local MongoDB instance
const uri = 'mongodb://localhost:27017';

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
    await client.close();
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
                    res.send('Signup failed');
                }
            } catch (err) {
                console.error('Error during signup:', err);
                res.send('Error during signup');
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
                res.send(`Login unsuccessful! Email: ${data.email}, Password: ${data.password}`);
            }
            closeConnection(); // Close connection after operations
        }
    );
}