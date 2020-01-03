import React, { useState } from 'react'
import { connect } from 'react-redux'
import { likeBlog, addComment, removeBlog } from '../reducers/blogReducer'
import { Form, Button, Container } from 'semantic-ui-react'
import { BrowserRouter as Router,
  Route, withRouter, Redirect } from 'react-router-dom'

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
        <Button type='submit' style={showRemove}>remove</Button>
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
    if (comment.length === 0) {
      return
    }
    let key = 1
    if (thisBlog.comments && thisBlog.comments.length >= 0) {
      key = thisBlog.comments.length + 1
    }
    const newComment = {
      comment,
      key
    }
    props.addComment(blog, comment, key)
    setThisBlog({ ...blog, comments: blog.comments.concat(newComment) })
    setComment('')
    return <Redirect to="/" />
  }

  const handleTextChange = (event) => {
    setComment(event.target.value)
  }

  if (thisBlog === undefined || !thisBlog) {
    return <Redirect to="/" />
  }

  let showRemove = { display: 'none' }

  if (thisBlog) {
    showRemove = {
      display: thisBlog.user.username === props.user.username ? '' : 'none' }

    return (
      <Router>
        <Container>
          <h2>{thisBlog.title} by {thisBlog.author}</h2>
          <p><a href={thisBlog.url}>{thisBlog.url}</a></p>
          likes {thisBlog.likes} <Button onClick={() => {
            like(thisBlog) }} >like</Button><br></br><br></br>
          <p>added by {thisBlog.user.name}</p>
          <Route exact path="/blogs/:id" render={() =>
            <Remove blogToRemove={thisBlog}
              removeBlog={props.removeBlog}
              showRemove={showRemove}
              setThisBlog={setThisBlog} />}
          />
          <h3>comments</h3>
          <Form onSubmit={() => handleComment(thisBlog)}>
            <Form.Field>
              <label>comment</label>
              <input name="Comment" value={comment}
                onChange={handleTextChange} />
            </Form.Field>
            <Button type="submit">add comment</Button>
          </Form>
          <ul>
            {thisBlog.comments.map(item => (
              <li key={item.key}>{item.comment}</li>
            ))}
          </ul>
        </Container>
      </Router>
    )
  }
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