const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const tasksRoutes = require("./routes/taskRoutes");
dotenv.config();
const app = express();
const port = 3000;



// MiddleWare

app.use(express.json());

//DB Connection
mongoose.connect(process.env.URI);

const db = mongoose.connection;

db.on("error", () => {
  console.log("Connection Error!");
});
db.once("open", () => {
  console.log("Connected DB!");
});

app.use(tasksRoutes);

app.listen(port, () => {
  console.log("on port 3000");
});
