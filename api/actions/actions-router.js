const express = require("express")
const router = express.Router();
const Action = require('./actions-model.js')

// ACTION ENDPOINTS

router.get('/api/actions', (res, req) => {
    Action.get(req.query)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch()
})

router.get('/:id', (res, req) => {
    const actionID = req.params.id
    Action.get(actionID)
    .then(action => {
        if (action) {
            res.status(200).json(action)
        } else {
            res.status(404).json({
                message: "Action with specific ID does not exist"
            })
        }
    })
    .catch()
})

router.post('/', (res, req) => {
    const newAction = req.body
    Action.insert(newAction)
    .then(action => {
        if(!action.description || !action.notes){
            res.status(400).json({
                message: "Input for descrition and notes is required"
            })
        } else {
            res.status(201).json(action)
        }
    })
    .catch()
})

router.put('/:id', (res, req) => {
    const actionID = req.params.id
    const updatedAction = req.body

    if(!updatedAction.description || !updatedAction.notes){
        res.status(400).json({
            message: "Input for descrition and notes is required"
        })
    } else {
        Action.get(actionID)
        .then(action => {
            if(!action) {
                res.status(404).json({
                    message: "Action with specific ID does not exist"
                })
            } else {
                Action.update(actionID, updatedAction)
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
        const actionID = req.params.id
        const deletedAction = await Action.remove(actionID)

        if(!deletedAction) {
            res.status(404).json({
                message: "Action with specific ID does not exist"
            })
        } else {
            res.status(201).json(deletedAction)
        }
    }
    catch(error) {
        res.status(500).json({
            message: "The action could not be removed"
        })
    }
})