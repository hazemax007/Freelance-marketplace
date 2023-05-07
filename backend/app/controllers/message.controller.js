const db = require('../models')
const Message = db.message

exports.getMessage = function(io) {
  (req,res) => {
    Message.find()
      .sort({ timestamp: 1 })
      .then((messages) => res.json(messages))
      .catch((error) => res.status(500).json({ error }));
  }

  exports.postMessage = (req,res) => {
    const { text, sender } = req.body;
    const message = new Message({ text, sender });
    message
      .save()
      .then(() => {
        io.emit('chat message', message);
        res.status(201).json(message);
      })
      .catch((error) => res.status(500).json({ error }));
}

}
