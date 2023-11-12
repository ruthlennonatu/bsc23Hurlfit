const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connection URI for local MongoDB instance
const uri = 'mongodb://localhost:27017';

// Database Name
const databaseName = 'hurling';

// Collection Name
const collectionName = 'users';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the login page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle login form submission
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');

    // Access the database
    const database = client.db(databaseName);

    // Access the collection
    const collection = database.collection(collectionName);

    // Check if the user with the provided email and password exists
    const user = await collection.findOne({ email, password });

    if (user) {
      // Redirect to the homepage on successful login
      res.redirect('/homepage');
    } else {
      // Display login unsuccessful message
      res.send(`Login unsuccessful! Email: ${email}, Password: ${password}`);
    }
  } catch (err) {
    console.error('Error occurred while connecting to MongoDB:', err);
  } finally {
    // Close the client
    await client.close();
  }
});

// Serve the homepage
app.get('/homepage', (req, res) => {
  res.send('Welcome to the homepage!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
