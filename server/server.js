const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes'); // Importing the routes

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', routes); // Using the routes

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
