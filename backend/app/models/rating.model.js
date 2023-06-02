const mongoose = require("mongoose");

    const Rating = mongoose.model(
      "rating",
      new mongoose.Schema(
        {
          value: { type: Number, min: 1, max: 5, required: true },
          user:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
          },
          project:{
            type:mongoose.Types.ObjectId,
            ref: "project"
          }
        },
        { timestamps: true }
      )
    );
  
  module.exports = Rating