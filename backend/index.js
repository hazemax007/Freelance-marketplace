const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const bodyParser = require('body-parser')

const app = express();


var corsOptions = {
  origin: "*"
};


app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const http = require('http').Server(app);
const io = require('socket.io')(http);
const db = require("./app/models");
const Role = db.role;
//const Message = db.message
//const User = db.user


db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to welyne application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/project.routes")(app);
require("./app/routes/application.routes")(app);
require("./app/routes/archive.routes")(app);
require("./app/routes/image.routes")(app);
require("./app/routes/rating.routes")(app);
require("./app/routes/message.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

 function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });

      new Role({
        name: "esn"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'esn' to roles collection");
      });

      new Role({
        name: "freelancer"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'freelancer' to roles collection");
      });

      new Role({
        name: "company"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'company' to roles collection");
      });
    }
  });

  io.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined');
    });

    socket.on('message', (data) => {
        io.in(data.room).emit('new message', {user: data.user, message: data.message});
    });
});

}