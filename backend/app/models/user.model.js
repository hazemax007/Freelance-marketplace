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
    intercontrat: {
      type: Boolean,
      default: false
    },
    image: String,
    applications: [
      {
        type: mongoose.Types.ObjectId,
        ref : "application"
      }
    ],
    projects: [
      {
        type: mongoose.Types.ObjectId,
        ref: "project"
      }
    ],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;