const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    if(body.username === undefined || body.password === undefined) {
      return response.status(400).json({ 
        error: 'username and password are required' })
    }
    if(body.username.length < 3 || body.password.length < 3) {
      return response.status(400).json({ 
        error: 'username and password must have at least 3 characters' })
    }

    const usersInDb = await User.find({})
    const usernames = usersInDb.map(user => user.username)
    if(usernames.includes(body.username)) {
      return response.status(400).json({ 
        error: 'username must be unique' })
    }
    
    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(body.password, salt)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('blogs', { title: 1, author: 1, url: 1, })
  
  res.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter