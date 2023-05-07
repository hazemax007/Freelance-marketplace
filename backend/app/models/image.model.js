const mongoose = require("mongoose");

    const Image = mongoose.model(
      "image",
      new mongoose.Schema(
        {
          filname: String,
          contentType: String,
          data: Buffer
          
        },
        { timestamps: true }
      )
    );
  
  module.exports = Image