import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import Notification from './components/Notification'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import  { useField } from './hooks/index'
import { setMessage, hideMessage } from './reducers/notificationReducer'
import { connect } from 'react-redux'

const App = (props) => {
  const [ blogs, setBlogs ] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')
  const [blogformVisible, setBlogformVisible] = useState(false)

  const hook = () => {
    blogService
      .getAll()
      .then( initBlogs => {
        console.log(initBlogs)
        setBlogs(initBlogs)
      })
    console.log(window.localStorage)
  }

  useEffect(hook, [])

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      console.log(loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setMsg = (message, type) => {
    props.setMessage({ message, type })
    setTimeout(() => props.hideMessage(), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.props.value,
        password: password.props.value
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      console.log(user)
      console.log(window.localStorage)
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      setMsg('wrong username or password', 'error')
    }
  }

  const logOut = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = async (event) => {
    event.preventDefault()
    if ( newTitle.props.value === '' || newUrl.props.value === '' ) {
      setMsg('title or url missing', 'error')
      return
    }
    const blogObject = {
      title: newTitle.props.value,
      author: newAuthor.props.value,
      url: newUrl.props.value
    }
    const savedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(savedBlog))

    const title = newTitle.props.value
    const author = newAuthor.props.value
    setMsg('Added blog ' + title + ' by ' + author, 'success')
    newTitle.reset()
    newAuthor.reset()
    newUrl.reset()
    setBlogformVisible(false)
  }

  const removeBlog = async (blog) => {
    if (window.confirm('Remove blog ' + blog.title + ' by ' + blog.author + '?'))  {
      try {
        await blogService.remove(blog.id)
      } catch (ex) {
        window.alert('only the creator can remove a blog.')
        console.log(ex)
      }
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
  }

  const hideWhenVisible = { display: blogformVisible ? 'none' : '' }
  const showWhenVisible = { display: blogformVisible ? '' : 'none' }

  if (user === null) {
    return (
      <div>
        <h2>log in to blog application</h2>
        <Notification />
        <LoginForm handleLogin = {handleLogin}
          username = {username.props}
          password = {password.props}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <table><tbody><tr><td><p>{user.name} logged in </p></td>
        <td width='50'><button onClick = { () => {
          logOut()}}>logout</button></td></tr></tbody></table>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogformVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm addBlog = {addBlog}
          title = {newTitle.props}
          author = {newAuthor.props}
          url = {newUrl.props}
        />
        <button onClick={() => setBlogformVisible(false)}>cancel</button></div><br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} removeBlog={removeBlog} user={user}/>
      )}
    </div>
  )
}

const mapDispatchToProps = {
  setMessage,
  hideMessage
}

export default connect(
  null,
  mapDispatchToProps
)(App)