const mongoose = require("mongoose");

    const Project = mongoose.model(
      "project",
      new mongoose.Schema(
        {
          title: String,
          description: String,
          field: String,
          technology: String,
          requirments: String,
          duration:Number,
          user:{
            type:mongoose.Types.ObjectId,
            ref:"User" 
          },
          applications: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "application"
            }
          ]
        },
        { timestamps: true }
      )
    );
  
  module.exports = Project