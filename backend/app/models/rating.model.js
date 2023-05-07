const mongoose = require("mongoose");

    const Rating = mongoose.model(
      "rating",
      new mongoose.Schema(
        {
          rate: Number,
          userId:{
            type:mongoose.Types.ObjectId,
            ref: "User"
          },
          ratedUserId:{
            type:mongoose.Types.ObjectId,
            ref: "User"
          }
        },
        { timestamps: true }
      )
    );
  
  module.exports = Rating