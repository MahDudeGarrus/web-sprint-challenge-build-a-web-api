const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router.js')
const actionsRouter = require('./actions/actions-router.js')


server.use(express.json());
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

//CATCH ALL
server.get('/', (req, res) => {
    res.send(`
        <h1>Projects and Actions API</h1>
        <p>Welcome! This is the Projects and Actions API!</p>
    `)
})

module.exports = server;
