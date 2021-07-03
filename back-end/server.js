const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json())
// simple route

require("./routes/task.routes.js")(app);
require("./routes/folder.routes.js")(app);
// set port, listen for requests
app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});