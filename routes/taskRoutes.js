const express = require("express");
const router = express.Router();

const Task = require("../models/task");

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(200).json({ message: "added succesfully", task });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const task = await Task.findByIdAndUpdate(id, dataToUpdate, { new: true });
    res.status(200).json({ message: "updated" , task});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/tasks/:id" , async(req , res)=>{
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted", task});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

module.exports = router;
