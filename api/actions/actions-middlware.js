// add middlewares here related to actions
const Action = require('../actions/actions-model.js')

function validateAction(req, res, next) {
    const { description, notes } = req.body
    if(!notes || !notes.trim() || !description || !description.trim()) {
      res.status(400).json({
        message: "Input for description and notes is required",
      })
    } else {
      req.notes = notes.trim()
      req.description = description.trim()
      next()
    }
  }

  module.exports = { validateAction }