const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const App = express()
const cors = require('cors')
const blogsRouter = require('./controller/blogs')
const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const mongoose = require('mongoose')
const logger = require('./utils/logger')


console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { 
  useNewUrlParser: true,
  useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

App.use(cors())
App.use(bodyParser.json())
App.use(logger)

App.use('/api/blogs', blogsRouter)
App.use('/api/users', usersRouter)
App.use('/api/login', loginRouter)

module.exports = App