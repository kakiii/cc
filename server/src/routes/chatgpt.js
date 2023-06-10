const express = require("express");
const router = express.Router();

require("dotenv").config();
const fs = require("fs");
const path = require("path");

// Read the JSON file
const baseline = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../../resources/baseline.json"), "utf8")
);

router.get("/response", (req, res) => {
  const scene = req.query.scene;
  const choice = req.query.choice;

  let currentScene = baseline[scene];

  if (!currentScene || !currentScene[choice]) {
    return res.status(404).json({ error: "Scene or choice not found" });
  }

  return res.json({ content: currentScene[choice] });
});

module.exports = router;

router.get("/hello", (req, res) => {
  res.json({ message: "Hello World!" });
});

module.exports = router;
