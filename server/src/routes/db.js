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
  const contentType = req.headers["content-type"];
  if (contentType !== "application/json") {
    return res.status(400).json({ error: "Only application/json content type is allowed" });
  }

  const data = req.body;
  console.log(data);

  try {
    JSON.parse(JSON.stringify(data)); // Check if data is in JSON format

    // Proceed with further processing
    user.insertOne(data);
    res.json(data).status(200);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Invalid JSON format" });
  }
});



router.get("/data", async (req, res) => {
  try{
      const data = await user.find().limit(10).toArray();  // Limit to first 10 documents
      res.status(200).json({data});

  } catch(err){
      console.log(err);
      res.sendStatus(500);
  }
});


module.exports = router;
