const sql = require("./db.js");

// constructor
const Folder = function(folder) {
  this.title = folder.title;
};

Folder.getAll = result => {
    sql.query("SELECT * FROM folders", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Tasks: ", res);
        result(null, res);
    });
};

Folder.create = (newFolder, result) => {
    sql.query("INSERT INTO folders SET ?", newFolder, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created task: ", {"folderId":res.insertId, ...newFolder });
        result(null, { "folderId":res.insertId, ...newFolder });
    });
};

Folder.remove = (id, result) => {
    sql.query("DELETE FROM folders WHERE folderId = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted folder with id: ", id);
      result(null, res);
    });
};

module.exports = Folder;