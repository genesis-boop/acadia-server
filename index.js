const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");
const fs = require('fs/promises');
const uniqid = require('uniqid');

// Middleware
app.use(cors());
app.use(express.json());
app.use("/static-files", express.static("files"));
app.use((_req, _res, next) => {
    console.log("Middleware running");
    next();
})

// API endpoint to save tasks
app.post('/todo', async (req, res) => {
    try{
        const newTask = req.body;
        newTask.id = uniqid();

        const taskData = await fs.readFile('./data/todo.json', 'utf-8');
        const tasks = JSON.parse(taskData);
        tasks.push(newTask);

        await fs.writeFile('./data/todo.json', JSON.stringify(tasks));
        res.status(201).json({message: 'Task Created!'});
    } catch(error) {
        console.log(error);
        res.status(500).json({message: 'Failed to save task'});
    }
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})