import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, removeBlog, user }) => {
  const [showDet, setShowDet] = useState(false)
  const [thisBlog, setThisBlog] = useState(blog)

  const likeBlog = async (thisBlog) => {
    const updatedBlog = {
      title: thisBlog.title,
      author: thisBlog.author,
      url: thisBlog.url,
      likes: thisBlog.likes + 1,
      user: thisBlog.user,
      id: thisBlog.id
    }
    const savedBlog = await blogService
      .update(thisBlog.id, updatedBlog)
    setThisBlog(savedBlog)
  }

  const toggle = () => {
    setShowDet(!showDet)
  }

  const showOrNot = { display: showDet ? '' : 'none' }

  const showRemove = {
    display: thisBlog.user.username === user.username ? '' : 'none' }

  return (
    <div className='blog' border='true' >
      <div onClick={() => toggle()}>
        {thisBlog.title} by {thisBlog.author}
      </div>
      <div style ={showOrNot} className='details' >
        <a href={thisBlog.url}>{thisBlog.url}</a><br></br>
        likes {thisBlog.likes} <button onClick ={ () => {
          likeBlog(thisBlog) }} >like</button><br></br>
        added by {thisBlog.user.name}<br></br>
        <button style={showRemove} onClick={ () => {
          removeBlog(thisBlog) }} >remove</button>
      </div>
    </div>
  )
}

export default Blog