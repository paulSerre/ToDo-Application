module.exports = app => {
    const folder = require("../controllers/folder.controller.js");
  
    // Create a new folder
    app.post("/folders", folder.create);
  
    // Retrieve all folders
    app.get("/folders", folder.findAll);

    app.delete("/folders/:folderId", folder.delete);
};