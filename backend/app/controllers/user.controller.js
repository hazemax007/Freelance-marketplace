const db = require("../models");
const User = db.user
const Image = db.image


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

  exports.getAllUsers = (req,res) => {

  User.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
  }

  exports.getUserById = (req,res) => {
    const id = req.params.id;

    User.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found User with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving User with id=" + id });
      });
  }

  exports.updateUser = async (req, res) => {
    try {
      const updatedUser = await User.updateOne({_id:req.params.id}, {$set: req.body});
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({message: error.message});
  }
  };

  exports.deleteUser = (req,res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        } else {
          res.send({
            message: "User was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  }

  exports.uploadImage = async (req,res) =>{
    try {
      const image = new Image({
        name: req.file.originalname,
        data: req.file.buffer,
        contentType: req.file.mimetype
      });
      const savedImage = await image.save();
      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { profileImage: savedImage._id },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error uploading image');
    }
  }

exports.retrieveImage = async (req,res) =>{
  try {
    const user = await User.findById(req.params.userId).populate('profileImage');
    if (!user) {
      return res.status(404).send('User not found');
    }
    if (!user.profileImage) {
      return res.status(404).send('Profile image not found');
    }
    res.set('Content-Type', user.profileImage.contentType);
    res.send(user.profileImage.data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving image');
  }
}