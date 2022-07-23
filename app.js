const express = require('express');

const app = express();


const projectsRoutes = require('./routes/project')
const { authUser, authRole} = require('./middleware/auth')
const { ROLE, users } = require('./data')
app.use(express.json())
app.use(setUser)

//fucking cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.get('/', (req, res) => {
    res.send('Home Page')
  })
  
  app.get('/dashboard', authUser, (req, res) => {
    res.send('Dashboard Page')
  })

  app.get('/admin', authUser, authRole(ROLE.ADMIN), (req, res) => {
    res.send('Admin Page')
  })

  function setUser(req, res, next) {
    const userId = req.body.userId
    if (userId) {
      req.user = users.find(user => user.id === userId)
    }
    next()
  }

module.exports = app;