
module.exports = app => {
    const messageController = require('../controllers/message.controller')
    var router = require("express").Router();
    const db = require('../models')
    const Message = db.message

    router.get('/',messageController.getMessage)
    app.use('/api/test/message', router);
}