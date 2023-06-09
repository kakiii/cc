const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require('dotenv').config();

// Connect to MongoDB
console.log(process.env.MONGODB_URI);
mongoose.connect(String(process.env.MONGODB_URI), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Define a schema
const Schema = mongoose.Schema;
const dataSchema = new Schema({
    name: String,
    value: String
});

// Create a model
const Data = mongoose.model('Data', dataSchema);

// Add a new data
router.post('/add', async (req, res) => {
    const data = new Data({
        name: req.body.name,
        value: req.body.value
    });

    try {
        const savedData = await data.save();
        res.json(savedData);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
