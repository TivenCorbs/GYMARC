// Import necessary modulesconst express = require('express');
constPouchDB = require('pouchdb');

// Initialize the Express appconst app = express();
app.use(express.json()); // Middleware to parse JSON request bodies// Initialize PouchDB databaseconst db = newPouchDB('fitness-app');

// POST route to create a new user
app.post('/api/users', async (req, res) => {
  try {
    // Insert the request body into the PouchDB databaseconst result = await db.put(req.body);

    // Respond with status 201 (Created) and the result of the insertion
    res.status(201).json(result);
  } catch (error) {
    // Respond with status 500 (Internal Server Error) and the error message
    res.status(500).json({ error: error.message });
  }
});

// GET route to retrieve a user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    // Retrieve the user document from the database using the provided IDconst user = await db.get(req.params.id);

    // Respond with status 200 (OK) and the retrieved user document
    res.status(200).json(user);
  } catch (error) {
    // If the user is not found, respond with status 404 (Not Found)
    res.status(404).json({ error: 'User not found' });
  }
});

// Set the Express app to listen on a specific port (e.g., 3000)constPORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
