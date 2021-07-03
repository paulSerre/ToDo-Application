const Task = require("../models/task.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a Task
    const task = new Task({
        done: req.body.done,
        title: req.body.title,
        folderId: req.body.folderId
    });
  
    // Save Task in the database
    Task.create(task, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Task."
            });
        else 
            res.send(data);
    });
};

exports.findAll = (_, res) => {
    Task.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
                });
        else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    Task.updateById(
        req.params.taskId,
        new Task(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found task with id ${req.params.taskId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating task with id " + req.params.taskId
                    });
                }
            } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Task.remove(req.params.taskId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Task with id ${req.params.taskId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Task with id " + req.params.taskId
          });
        }
      } else res.send({ message: `Task was deleted successfully!` });
    });
  };