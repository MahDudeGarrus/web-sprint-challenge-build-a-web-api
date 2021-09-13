// add middlewares here related to projects
const Project = require('../projects/projects-model.js')

// I couldn't put this one in since it made the test fail.
async function validateProjectID(req, res, next) {
    try{
        const projectID = await Project.get(req.params.id)
        if(!projectID) {
            next({status: 404, message: "Project with specific ID does not exist"})
        } else {
            req.projectID = projectID
            next()
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

function validateProject(req, res, next) {
    const { name, description } = req.body
    if(!name || !name.trim() || !description || !description.trim()) {
      res.status(400).json({
        message: "Input for name and descrition is required",
      })
    } else {
      req.name = name.trim()
      req.description = description.trim()
      next()
    }
  }

  module.exports = {
      validateProject,
      validateProjectID
  }