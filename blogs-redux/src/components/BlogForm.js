import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Label } from 'semantic-ui-react'


const BlogForm = props => {
  const addBlog = props.addBlog
  const title = props.title
  const author = props.author
  const url = props.url

  return (
    <div>
      <h3>Add a new blog</h3>
      <Form onSubmit={addBlog}>
        <Form.Field>
          <Label>title</Label>
          <input name="Title" {...title}/>
        </Form.Field>
        <Form.Field>
          <Label>author</Label>
          <input name="Author"{...author} />
        </Form.Field>
        <Form.Field>
          <Label>url</Label>
          <input name="Url"{...url} />
        </Form.Field>
        <Button type="submit">submit</Button>
      </Form>
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