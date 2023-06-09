const express = require('express');
const fs = require('fs');
const router = express.Router();

router.post('/record-choice', (req, res) => {
  const choice = req.body;
  const choiceData = JSON.stringify(choice);

  // Append the choice to a file
  fs.appendFile('choices.json', choiceData + '\n', (err) => {
    if (err) {
      console.error('Error recording choice:', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.get('/choices', (req, res) => {
  // Read the choices from the file and send as response
  fs.readFile('choices.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading choices:', err);
      res.sendStatus(500);
    } else {
      const choices = data.trim().split('\n').map(JSON.parse);
      res.json(choices);
    }
  });
});

module.exports = router;
