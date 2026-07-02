require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 4000

const app = express();

app.use(express.json()); 

app.use(cors('*'));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.status(200).json(path.join(__dirname, "new", "index.html"));
});

let work = [
    {
        id: 1,
        task: "Walk Dog",
        status: false,
        dueDate: null
    }    
];

app.get("/", (req, res) => {
    res.send(`Ending of the first 4 weeks of training`);
});

app.get("/work", (req, res) => {
    res.status(200).json(work);
});

app.post("/work", (req, res) => {
    if(!task){
        return res.status(400).json( {error: "Task Needed"} ); // validate
    }
    const {task, status} = req.body;

    const newWork = {
        id: work.length + 1,
        task: req.body.task,
        status: false,
        dueDate: req.body.dueDate || null
    }

    work.push(newWork);
    res.status(201).json(newWork);
});

// GET One
app.get("/work/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const works = work.find((w) => {
        w.id === id
    });
    if(!works){
        return res.status(404).json( {error: "Not Found"} );
    }
    res.status(200).json(works);
});

// PATCH update
app.patch("/work/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const works = work.find((w) =>{
        w.id === id;
    });
    if(!works){
        return res.status(404).json( {error: `Not Found`} );
    }
    Object.assign(works, req.body);
    res.status(200).json(works);
});

// DELETE
app.delete("/work/:id", (req, res) => {
    const id = parseInt(req.params.id);
    constlenBefore = work.length;
    works = work.filter((w) => {
        w.id !== id
    });
    if(work.length === lenBefore){
        return res.status(404).json( {error: `Not Found`} );
    }
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Listening from http://localhost:${PORT}`);
});