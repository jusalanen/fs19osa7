import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'
import { likeBlog, addComment, removeBlog } from '../reducers/blogReducer'
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
  const [comment, setComment] = useState('')
  const [thisBlog, setThisBlog] = useState(props.blog)

  const like = (blog) => {
    props.likeBlog(blog)
    setThisBlog({ ...blog, likes: blog.likes + 1 })
  }

  const handleComment = (blog) => {
    setThisBlog({ ...blog, comments: blog.comments.concat(comment) })
    props.addComment(blog, comment)
    setComment('')
  }

  const handleTextChange = (event) => {
    setComment(event.target.value)
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
          <h3>comments</h3>
          <form onSubmit={() => handleComment(thisBlog)}>
            <input type='text'
              value={comment} onChange={handleTextChange} />
            <button type='submit' >add comment</button>
          </form>
          <ul>
            {thisBlog.comments.map(item => (
              <li key={item.id}>{item.comment}</li>
            ))}
          </ul>
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
  addComment,
  removeBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleBlog)