const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.project = require("./project.model");
db.image = require("./image.model")

db.ROLES = ["user","admin","esn","freelancer","company"];

module.exports = db;