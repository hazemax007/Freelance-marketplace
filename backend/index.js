const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");


const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


var corsOptions = {
  origin: "*"
};

app.use(express.static(__dirname + '/frontend'));

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const Message = db.message

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

  app.post('/api/test/messages', (req, res) => {
    const { sender, text } = req.body;
    const newMessage = new Message({ sender, text });
  
    newMessage.save((err, savedMessage) => {
      if (err) {
        console.error('Error saving message:', err);
        res.status(500).send('An error occurred while saving the message.');
      } else {
        io.emit('message', savedMessage);
        res.status(201).json(savedMessage);
      }
    });
  });

  app.get('/api/test/messages', (req, res) => {
    Message.find({}, (err, messages) => {
      if (err) {
        console.error('Error retrieving messages:', err);
        res.status(500).send('An error occurred while retrieving messages.');
      } else {
        res.json(messages);
      }
    });
  });
  
  io.on('connection', (socket) => {
    console.log('User connected');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  
}