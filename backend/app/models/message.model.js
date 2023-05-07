const mongoose = require("mongoose");

    const Message = mongoose.model(
      "message",
      new mongoose.Schema(
        {
          text:String,
          sender:String,
          timestamp: { type: Date, default: Date.now },
        },
      )
    );
  
  module.exports = Message