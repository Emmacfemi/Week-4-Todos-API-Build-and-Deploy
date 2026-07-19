const express = require("express");

const userPostValidate = require("../middleware/postvalidation");
const userPatchValidate = require("../middleware/patchvalidation");

const routes = express.Router();

let work = [
    {
        id: 1,
        task: "Walk Dog",
        status: false,
        dueDate: null
    }    
];


routes.get("/", (req, res) => {
    res.status(200).json(work);
    
});

routes.post("/", userPostValidate, (req, res, next) => {
    try {
        const {task, status, dueDate} = req.body;

        if(!task || task <= 3){
            return res.status(400).json( {error: "Task Needed"} ); // validate
        }

        const newWork = { id: work.length+1, ...req.body};

        work.push(newWork);
        res.status(201).json(newWork);
        
    } catch (error) {
        next(error);
    }
});


// PATCH update
routes.patch("/:id", userPatchValidate, (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const works = work.find((w) => w.id === id);
        if(!works){
            return res.status(404).json( {error: `Not Found`} );
        }
        Object.assign(works, req.body);
        res.status(200).json(works);
    } catch (error) {
        next(error)
        
    }
});

// DELETE
routes.delete("/:id", (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const lenBefore = work.length;
        const works = work.filter((w) => w.id !== id);
        if(works.length === lenBefore){
            return res.status(404).json( {error: `Task Not Found`} );
        }
        res.status(204).send();
    } catch (error) {
        next(error);
        
    }
});

// Completed Todos
routes.get('/completed', (req, res, next) => {
  try {
    const completed = work.filter((t) => t.status);
    res.json(completed); // Custom Read!
  } catch (error) {
    next(error);
    
  }
});

// Active todos
routes.get('/active', (req, res, next) => {
  try {
    const activeTodos = work.filter((todo) => !todo.status);
    res.status(200).json(activeTodos);
  } catch (error) {
    next(error);
    
  }
});

// GET One
routes.get("/:id", (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const works = work.find((w) => w.id === id);
        if(!works){
            return res.status(404).json( {error: "Not Found"} );
        }
        res.status(200).json(works);
        
    } catch (error) {
        next(error);        
    }
});


module.exports = routes;