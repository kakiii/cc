const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

const uri = process.env.MONGODB_URI;
console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.post('/data', (req, res) => {
    
    
    client.connect(err => {
        if (err) {
            console.log('Connection error: ', err);
            res.status(500).send('Error connecting to database');
            client.close();
            return;
        }

        const collection = client.db("crowd-computing").collection("user");
        collection.insertOne(req.body, (err, result) => {
            if (err) {
                console.log('Error inserting data: ', err);
                res.status(500).send('Error inserting data into database');
            } else {
                res.status(200).send('Data inserted successfully');
            }

            client.close();
        });
    });
});

module.exports = router;
