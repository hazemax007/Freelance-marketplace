const mongoose = require("mongoose");

    const Image = mongoose.model(
      "image",
      new mongoose.Schema(
        {
          name: { type: String, required: true },
          imagePath: { type: String, required: true },
          user:{
            type:mongoose.Types.ObjectId,
            ref:"User" 
          },
          
        },
        { timestamps: true }
      )
    );
  
  module.exports = Image