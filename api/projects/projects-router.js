const express = require("express");
const router = express.Router();
const Project= require('./projects-model.js');

// PROJECT ENDPOINTS

router.get('/', (res, req) => {
    Project.get(req.query)
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch()
})

router.get('/:id', (res, req) => {
    const projectID = req.params.id

    Project.get(projectID)
    .then(project => {
        if(project){
            res.status(200).json(project)
        } else {
            res.status(404).json({
                message: "Project with specific ID does not exist"
            })
        }
    })
    .catch()
})

router.post('/', (res, req) => {
    const newProject = req.body

    Project.insert(newProject)
    .then(project => {
        if(!newProject.name || !newProject.description){
            res.status(400).json({
                message: "Input for name and descrition is required"
            })
        } else {
            res.status(201).json(project)
        }
    })
    .catch()
})

router.put('/:id', (res, req) => {
    const projectID = req.params.id
    const updatedProject = req.body

    if(!updatedProject.name || !updatedProject.description){
        res.status(400).json({
            message: "Input for name and descrition is required"
        })
    } else {
        Project.get(projectID)
        .then(project => {
            if(!project) {
                res.status(404).json({
                    message: "Project with specific ID does not exist"
                })
            } else {
                Project.update(projectID, updatedProject)
                .then(update => {
                    res.status(200).json(update)
                })
            }
        })
        .catch()
    }
})

router.delete('/:id', async (res, req) => {
    try{
        const projectID = req.params.id
        const deletedProject = await Project.remove(projectID)

        if(!deletedProject){
            res.status(404).json({
                message: "Project with specific ID does not exist"
            })
        } else {
            res.status(201).json(deletedProject)
        }
    }
    catch(error) {
        res.status(500).json({
            message: "The project could not be removed"
        })
    }
})

router.get('/:id/actions', (res, req) => {
    const projectID = req.params.id

    Project.getProjectActions(projectID)
    .then(actions => {
        if(!actions) {
            res.status(404).json({
                message: "Project with specific ID does not exist"
            })
        } else {
            res.status(200).json(actions)
        }
    })
    .catch()
})