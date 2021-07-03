const Folder = require("../models/folder.model.js");

exports.findAll = (_, res) => {
  Folder.getAll((err, data) => {
      if (err)
          res.status(500).send({
              message:
                  err.message || "Some error occurred while retrieving tasks."
              });
      else res.send(data);
  });
};


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a Folder
    const folder = new Folder({
        title: req.body.title
    });
  
    // Save Task in the database
    Folder.create(folder, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Folder."
            });
        else 
            res.send(data);
    });
};

exports.delete = (req, res) => {
    Folder.remove(req.params.folderId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Folder with id ${req.params.folderId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Folder with id " + req.params.folderId
          });
        }
      } else res.send({ message: `Folder was deleted successfully!` });
    });
  };