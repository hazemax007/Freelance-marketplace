const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    birthdate: Date,
    phonenumber: String,
    address: String,
    profileImage:{
      type:mongoose.Schema.Types.ObjectId,
      ref: "Image"
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;