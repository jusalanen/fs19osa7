import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import SingleBlog from './components/SingleBlog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useField } from './hooks/index'
import { setMessage, hideMessage } from './reducers/notificationReducer'
import { initializeBlogs, newBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import loginService from './services/login'
import { login, setUser, logout } from './reducers/userReducer'
import { getAllUsers } from './reducers/allUsersRedecer'
import { connect } from 'react-redux'
import UserList from './components/UserList'
import User from './components/User'
import {
  BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Menu = (props) => {
  const padding = {
    paddingRight: 10
  }
  return (
    <div className='menu'>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {props.user.name} logged in <button onClick = { () => {
        props.logOut()}}>logout</button>
    </div>
  )
}

const BlogList = (props) => {
  const [blogformVisible, setBlogformVisible] = useState(false)
  const hideWhenFormVisible = { display: blogformVisible ? 'none' : '' }
  const showWhenFormVisible = { display: blogformVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenFormVisible}>
        <button onClick={() => setBlogformVisible(true)}>new blog</button>
      </div>
      <div style={showWhenFormVisible}>
        <BlogForm addBlog = {props.addBlog}
          title = {props.newTitle.props}
          author = {props.newAuthor.props}
          url = {props.newUrl.props}
        />
        <button onClick={() => setBlogformVisible(false)}>cancel</button></div><br></br>
      {props.blogs.map(blog => <div key={blog.id} className='blog' border='true' >
        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></div>)}
    </div>
  )
}

const App = (props) => {
  const username = useField('text')
  const password = useField('password')
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')

  const getBlogs = props.initializeBlogs
  const getUsers = props.getAllUsers
  const setLoggedUser = props.setUser
  const allUsers = props.allUsers
  const blogs = props.blogs

  useEffect(() => {
    getBlogs()
  }, [getBlogs])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoggedUser(user)
    }
  }, [])

  const setMsg = (message, type) => {
    props.setMessage({ message, type })
    setTimeout(() => props.hideMessage(), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const credentials = {
        username: username.props.value,
        password: password.props.value
      }
      const loggedUser = await loginService.login(credentials)
      console.log(loggedUser)
      props.login(loggedUser)

      username.reset()
      password.reset()
    } catch (exception) {
      console.log(exception.message)
      setMsg('wrong username or password', 'error')
    }
  }

  const logOut = () => {
    props.logout()
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

    props.newBlog(blogObject)

    const title = newTitle.props.value
    const author = newAuthor.props.value
    setMsg('Added blog ' + title + ' by ' + author, 'success')
    newTitle.reset()
    newAuthor.reset()
    newUrl.reset()
  }

  const userById = (id) =>
    allUsers.find(u => u.id === id)

  const blogById = (id) =>
    blogs.find(b => b.id === id)

  if (props.user === null) {
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
    <Router>
      <div>
        <Menu logOut={logOut} user={props.user}/>
        <h1>Blogs</h1>
        <Notification />
        <Route exact path="/" render={() =>
          <BlogList blogs={props.blogs}
            user={props.user}
            addBlog={addBlog}
            newTitle={newTitle}
            newAuthor={newAuthor}
            newUrl={newUrl}/>} />
        <Route exact path="/blogs/:id" render={({ match }) =>
          <SingleBlog blog={blogById(match.params.id)} />} />
        <Route exact path="/users" render={() => <UserList users={props.allUsers} />} />
        <Route exact path="/users/:id" render={({ match }) =>
          <User user={userById(match.params.id)} />} />
      </div>
    </Router>

  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    blogs: state.blogs,
    user: state.user,
    allUsers: state.allUsers
  }
}


const mapDispatchToProps = {
  setMessage,
  hideMessage,
  initializeBlogs,
  newBlog,
  likeBlog,
  removeBlog,
  login,
  setUser,
  logout,
  getAllUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
