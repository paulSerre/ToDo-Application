module.exports = app => {
    const tasks = require("../controllers/task.controller.js");
  
    // Create a new tasks
    app.post("/tasks", tasks.create);
  
    // Retrieve all tasks
    app.get("/tasks", tasks.findAll);

    // Update one task by id
    app.put("/tasks/:taskId", tasks.update);
  
};