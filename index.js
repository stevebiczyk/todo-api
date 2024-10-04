const express = require('express');

// Initiate express app
const app = express();

// Define server port
const port = 3200;

// Create a default route
app.get('/', (req, res) => {
  res.send('Express & TypeScript Server');
});

// Start listening to requests on the defined port
app.listen(port);
