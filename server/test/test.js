const mongoose = require("mongoose");
const chai = require("chai");
const assert = chai.assert;
require('dotenv').config();

describe("MongoDB Connection", function () {
  this.timeout(10000); // Increase timeout to 10 seconds
    console.log(process.env.MONGODB_URI);
  it("connects successfully", function (done) {
    mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        assert.isTrue(true);
        done();
      })
      .catch((err) => {
        assert.isTrue(false, "Could not connect to MongoDB");
        done(err);
      });
  });
});
