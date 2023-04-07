const mongoose = require("mongoose");

const Image = mongoose.model(
  "Image",
  new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String
  })
);

module.exports = Image;