module.exports = app => {
    const imageController = require('../controllers/image.controller')
    var router = require("express").Router();
    const multer = require('multer');

    const storage = multer.memoryStorage();
    const upload = multer({ dest: 'uploads/' });
    
    router.post("/", upload.single('image'),imageController.uploadImage)
    router.get("/:id", imageController.getImage)

    app.use('/api/test/image', router);
}