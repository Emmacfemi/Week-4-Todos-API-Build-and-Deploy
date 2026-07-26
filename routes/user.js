const express = require("express");

const userPostValidate = require("../middleware/postvalidation");
const userPatchValidate = require("../middleware/patchvalidation");

const Work = require("../models/work.model");


const routes = express.Router();

routes.get("/", async (req, res, next) => {
    try {
        const userWork = {};

        if(req.query.status !== undefined){
            userWork.status = req.query.status === "true";
        }

        const work = await Work.find(userWork);

        res.status(200).json(work);
        
    } catch (error) {
        next(error);
        
    }
    
    
});

routes.post("/", userPostValidate, async (req, res, next) => {
    
    try {     
        const {task, status, dueDate} = req.body;

        const newWork = await Work.create({
            task,
            status,
            dueDate
        });
            
        res.status(201).json(newWork);
        
    } catch (error) {
        next(error);
    }
});


// PATCH update
routes.patch("/:id", userPatchValidate, async (req, res, next) => {
    try {
        const workId = (req.params.id);

        const works = await Work.findByIdAndUpdate(workId, req.body, {
            new: true,
            runValidators: true
        });

        if(!works){
            return res.status(404).json( {error: `Work Not Found`} );
        }
        
        res.status(200).json(works);

    } catch (error) {
        next(error);
        
    }
});

// DELETE
routes.delete("/:id", async (req, res, next) => {
    try {
        const workId = req.params.id;
        
        const works = await Work.findByIdAndDelete(workId);

        if(!works){
            return res.status(404).json( {error: `Task Not Found`} );
        }

        res.status(200).json({ message: `Work ${workId} deleted` });

    } catch (error) {
        next(error);
        
    }
});

// Completed Todos
routes.get('/completed', async (req, res, next) => {
  try {
    const completed = await Work.find({status: true});

    res.status(200).json(completed); // Custom Read!

  } catch (error) {
    next(error);
    
  }
});

// Active todos
routes.get('/active', async (req, res, next) => {
  try {
    const activeTodos = await Work.find({ status: false });

    res.status(200).json(activeTodos);

  } catch (error) {
    next(error);
    
  }
});

// GET One
routes.get("/:id", async (req, res, next) => {
    try {
        const workId = (req.params.id);

        const works = await Work.findById(workId);

        if(!works){
            return res.status(404).json( {error: "Not Found"} );
        } 
        
        res.status(200).json(works);
        
    } catch (error) {
        next(error);        
    }
});


module.exports = routes;