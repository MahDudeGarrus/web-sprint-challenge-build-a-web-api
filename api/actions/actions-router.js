const express = require("express")
const router = express.Router();
const Action = require('./actions-model.js')
const { validateAction } = require('../actions/actions-middlware.js')

// ACTION ENDPOINTS

router.get('/', (req, res) => {
    Action.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        res.status(500).json({
            message: error.message
        })
    })
})

router.get('/:id', (req, res) => {
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
    .catch(error => {
        res.status(500).json({
            message: error.message
        })
    })
})

router.post('/', validateAction, (req, res) => {
    const newAction = req.body

    Action.insert(newAction)
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(error => {
        res.status(500).json({
            message: error.message
        })
    })
})

router.put('/:id', (req, res) => {
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
        .catch(error => {
            res.status(500).json({
                message: error.message
            })
        })
    }
})

router.delete('/:id', async (req, res) => {
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

module.exports = router