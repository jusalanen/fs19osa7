const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  try {
  const blogs = await Blog.find({})
  .populate('user', { username: 1, name: 1 })
  .populate('comments', { comment: 1 })
 
  response.json(blogs.map(blog => blog.toJSON()))
  } catch (e) {
    console.log(e)
  }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const token = getTokenFrom(request)
  
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const addingUser = await User.findById(decodedToken.id)
    
    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: addingUser._id
    })

    const savedBlog = await newBlog.save()
    addingUser.blogs = addingUser.blogs.concat(savedBlog._id)
    await addingUser.save()
    response.status(201).json(savedBlog.toJSON())
  } catch (ex) {
    console.log(ex.message)
    next(ex)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const token = getTokenFrom(request)
  const blog = await Blog.findById(request.params.id) 
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || decodedToken.id !== blog.user.toString()) {
      return response.status(401).json({ error: 'only the blog creator can delete a blog' })
    }
    const comments = blog.comments
    comments.forEach(comment =>
    Comment.findByIdAndRemove(comment._id.toString()))
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (ex) {
    console.log(ex.message)
    next(ex)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments
  }
  const blogId = request.params.id
  try {
    const updBlog = await Blog.findByIdAndUpdate(blogId, blog, { new: true })
    response.json(updBlog.toJSON())
  } catch (ex) {
    console.log(ex.message)
    next(ex)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body
  if (!body || !body.comment) {
    return response.status(400).json({ error: 'comment contents missing' })
  }
  try {
    const blog = await Blog.findById(request.params.id)
    const comment = new Comment({
    comment: body.comment,
    key: body.key,
    blog: blog._id
    })
    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment)
    await blog.save()
    response.status(201).json(savedComment.toJSON())
  } catch (ex) {
    console.log(ex.message)
    next(ex)
  }  
})

module.exports = blogsRouter