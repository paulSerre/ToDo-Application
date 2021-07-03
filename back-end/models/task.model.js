const sql = require("./db.js");

// constructor
const Task = function(task) {
  this.done = task.done;
  this.title = task.title;
  this.folderId = task.folderId;
};

Task.create = (newTask, result) => {
    sql.query("INSERT INTO tasks SET ?", newTask, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created task: ", {"taskId": res.insertId, ...newTask });
        result(null, {"taskId": res.insertId, ...newTask });
    });
};

Task.getAll = result => {
    sql.query("SELECT * FROM tasks", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Tasks: ", res);
        result(null, res);
    });
};

Task.updateById = (id, task, result) => {
    sql.query(
        "UPDATE tasks SET done = ?, title = ? WHERE taskId = ?",
        [task.done, task.title, id],
        (err, res) => {
            if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
            }   
            if (res.affectedRows == 0) {
            // not found task with the id
            result({ kind: "not_found" }, null);
            return;
            }
        console.log("updated task: ", { id: id, ...task });
        result(null, { id: id, ...task });
        }
    );
};


module.exports = Task;