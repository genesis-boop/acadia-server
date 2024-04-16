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

app.get('/todo', async(req, res) => {
    try {
        const todoData = await fs.readFile('./data/todo.json', 'utf-8');
        const todos = JSON.parse(todoData);
        res.status(200).json(todos);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to fetch to-dos'});
    }
});

app.post('/notes', async (req, res) => {
    try {
        const newNote = req.body;
        newNote.id = uniqid();

        const noteData = await fs.readFile('./data/notes.json', 'utf-8');
        const note = JSON.parse(noteData);
        note.push(newNote);

        await fs.writeFile('./data/notes.json', JSON.stringify(note));
        res.status(201).json({message: 'Note Created!'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Failed to save task'});
    }
})

app.get('/notes', async (req, res) => {
    try {
        const noteData = await fs.readFile('./data/notes.json', 'utf-8');
        const notes = JSON.parse(noteData);

        res.status(200).json(notes); // Send the array of notes

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch notes' }); 
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})