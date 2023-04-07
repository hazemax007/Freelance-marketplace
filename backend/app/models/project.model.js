const mongoose = require("mongoose");

    const Project = mongoose.model(
      "project",
      new mongoose.Schema(
        {
          title: String,
          description: String,
          field: String,
          technology:String,
          requirments:String,
          duration:Number
        },
        { timestamps: true }
      )
    );
  
  module.exports = Project