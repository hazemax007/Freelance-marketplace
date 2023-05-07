const db = require("../models");
const Image = db.image

exports.uploadImage = async (req,res) => {
    const { originalname, mimetype, buffer } = req.file;
    const image = new Image({
        filename: originalname,
        contentType: mimetype,
        data: buffer
    });
    await image.save();
    res.json(image);
}

exports.getImage = async(req,res) => {
    const image = await Image.findById(req.params.id);
    res.set('Content-Type', image.contentType);
    res.send(image.data);
}