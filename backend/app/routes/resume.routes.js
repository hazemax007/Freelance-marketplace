module.exports = app => {
    const resumeController = require('../controllers/resume.controller')
    var router = require("express").Router();
    var multer = require('multer')

    const upload = multer();

    
    router.get('/flaskTest',resumeController.testFlaskServer)

    router.get('/',resumeController.getAllResumes)

    router.post("/:userId/:projectId" ,upload.single('resume'),resumeController.resumeParser)



    app.use('/api/test/resume', router);
}