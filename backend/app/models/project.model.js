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
            type:mongoose.Schema.Types.ObjectId,
            ref:"User" 
          },
          applications: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "application"
            }
          ],
          resumes:[
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "resume"
            }
          ],
          ratings:[
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'rating'
          }
        ]
        },
        { timestamps: true }
      )
    );
  
  module.exports = Project