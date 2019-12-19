import React, { useState } from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { BrowserRouter as Router,
  Route, Redirect, withRouter } from 'react-router-dom'

const RemoveBlog = (props) => {
  const blog = props.blogToRemove
  const showRemove = props.showRemove
  const setThisBlog= props.setThisBlog
  const removeBlog = props.removeBlog

  const handleRemove = e => {
    e.preventDefault()
    if (window.confirm('Remove blog ' + blog.title + ' by ' + blog.author + '?'))  {
      try {
        removeBlog(blog)
        props.history.push('/')
        setThisBlog(null)
      } catch (ex) {
        console.log(ex.message)
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleRemove}>
        <button type='submit' style={showRemove}>remove</button>
      </form>
    </div>
  )
}

const Remove = withRouter(RemoveBlog)

const SingleBlog = (props) => {
  const [thisBlog, setThisBlog] = useState(props.blog)

  const like = (blog) => {
    props.likeBlog(blog)
    setThisBlog({ ...blog, likes: blog.likes + 1 })
  }

  if (thisBlog === undefined ) {
    return null
  }

  let showRemove = { display: 'none' }

  if (thisBlog) {
    showRemove = {
      display: thisBlog.user.username === props.user.username ? '' : 'none' }

    return (
      <Router>
        <div>
          <h2>{thisBlog.title} by {thisBlog.author}</h2>
          <p><a href={thisBlog.url}>{thisBlog.url}</a></p>
          likes {thisBlog.likes} <button onClick={() => {
            like(thisBlog) }} >like</button><br></br>
          <p>added by {thisBlog.user.name}</p>
          <Route exact path="/blogs/:id" render={() =>
            <Remove blogToRemove={thisBlog}
              removeBlog={props.removeBlog}
              showRemove={showRemove}
              setThisBlog={setThisBlog} />}
          />
        </div>
      </Router>
    )
  }
  return(
    <Router>
      <Route exact path="/blogs/:id" render={() =>
        <Redirect to="/" />//ei taida toimia
      } />
    </Router>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.user
  }
}
const mapDispatchToProps = {
  likeBlog,
  removeBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleBlog)