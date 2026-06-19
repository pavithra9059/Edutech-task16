const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

// GET all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// ADD task
app.post("/tasks", (req, res) => {
    const task = {
        id: Date.now(),
        title: req.body.title
    };
    tasks.push(task);
    res.json(task);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.json({ message: "Task deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
