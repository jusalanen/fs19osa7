import React, { useState } from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = (props) => {
  const [showDet, setShowDet] = useState(false)
  const [thisBlog, setThisBlog] = useState(props.blog)

  const toggle = () => {
    setShowDet(!showDet)
  }

  const like = (blog) => {
    props.likeBlog(blog)
    setThisBlog({ ...blog, likes: blog.likes + 1 })
  }

  const remove = (blog) => {
    if (window.confirm('Remove blog ' + blog.title + ' by ' + blog.author + '?'))  {
      try {
        props.removeBlog(blog)
      } catch (ex) {
        console.log(ex.message)
      }
    }
  }

  const showOrNot = { display: showDet ? '' : 'none' }

  const showRemove = {
    display: thisBlog.user.username === props.user.username ? '' : 'none' }

  return (
    <div className='blog' border='true' >
      <div onClick={() => toggle()}>
        {thisBlog.title} by {thisBlog.author}
      </div>
      <div style ={showOrNot} className='details' >
        <a href={thisBlog.url}>{thisBlog.url}</a><br></br>
        likes {thisBlog.likes} <button onClick={ () => {
          like(thisBlog) }} >like</button><br></br>
        added by {thisBlog.user.name}<br></br>
        <button style={showRemove} onClick={ () => {
          remove(thisBlog) }} >remove</button>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog
}

export default connect(
  null,
  mapDispatchToProps
)(Blog)