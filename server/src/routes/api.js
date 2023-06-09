const express = require("express");
const router = express.Router();
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();

const uri = process.env.MONGODB_URI;
// console.log(uri);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try{
    client.connect();
    client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
catch(err){
    console.log(err);
}
const cc_db = client.db("crowd-computing");
const user = cc_db.collection("user");

router.post("/data", (req, res) => {
  const data = req.body;
  // const data_json = JSON.stringify(data);
  console.log(data);
  try {
    user.insertOne(data);
    data['status'] = 'success';
    res.json(data).status(200);
  }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }


});

router.get("/data", (req, res) => {
    try{
        const data = user.find();
        res.json(data).status(200);

    }catch{
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;
