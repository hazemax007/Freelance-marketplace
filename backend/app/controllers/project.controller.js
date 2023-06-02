const db = require("../models");
const User = require("../models/user.model");
const Project = db.project;

// Create and Save a new Project
exports.create = (req, res) => {
    // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Project
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    field: req.body.field,
    technology: req.body.technology,
    requirments: req.body.requirments,
    duration: req.body.duration
  });

  // Save Project in the database
  project
    .save(project)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    });
};


// Retrieve all Projects from the database.
exports.findAll = (req, res) => {
    const field = req.query.field;
    const technology = req.query.technology;
    var condition = field ? { field: { $regex: new RegExp(field), $options: "i" } } : {} &&
                  technology ? { technology: { $regex: new RegExp(technology), $options: "i" } } : {}  ;

    var condition1 = 

  Project.find(condition)
  .populate('ratings')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects."
      });
    });
};

// Find a single Project with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Project.findById(id).populate('ratings')
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Project with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Project with id=" + id });
    });
};

// Update a Project by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Project.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Project with id=${id}. Maybe Project was not found!`
            });
          } else res.send({ message: "Project was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Project with id=" + id
          });
        });
};

// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Project.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
          });
        } else {
          res.send({
            message: "Project was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Project with id=" + id
        });
      });
};

// Delete all Missions from the database.
exports.deleteAll = (req, res) => {
    Project.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Project were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all projects."
      });
    });
};

// Find all published Projects
exports.findAllPublished = (req, res) => {
  
};

exports.assignProject = async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.params;
  
  // Check that the project and user exist
  const project = await Project.findById(projectId);
  const user = await User.findById(userId);
  if (!project || !user) {
    return res.status(404).json({ message: 'Project or user not found' });
  }

  // Assign the project to the user
  user.projects.push(project);
  await user.save();

  if(user.projects.includes(project)){
    return res.status(401).json({ message: 'Project already assigned' });
  }else{
    return res.status(200).json({ message: 'Project assigned successfully' });
  }

};