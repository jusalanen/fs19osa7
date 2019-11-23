import React from 'react'
import PropTypes from 'prop-types'


const BlogForm = props => {
  const addBlog = props.addBlog
  const title = props.title
  const author = props.author
  const url = props.url

  return (
    <div>
      <h3>Add a new blog</h3>
      <form onSubmit={addBlog}>
        <div>
            title <input {...title}
            name="Title" />
        </div>
        <div>
            author <input {...author}
            name="Author" />
        </div>
        <div>
            url <input {...url}
            name="Url" />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
}

export default BlogForm