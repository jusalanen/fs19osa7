/*eslint-disable no-case-declarations*/
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log(action)
  switch (action.type) {

  case 'INIT_BLOGS':
    return action.data

  case 'CREATE':
    return [...state, action.data]

  case 'LIKE':
    const likedBlog = action.data
    const likeId = likedBlog.id
    return state.map(blog => blog.id === likeId ? likedBlog : blog)

  case 'DELETE':
    const delId = action.data
    return state.filter(blog => blog.id !== delId)

  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs,
      })
    } catch (e) {
      console.log(e.message)
    }
  }
}

export const newBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data: newBlog,
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const id = blog.id
    const liked = { ...blog, likes: blog.likes + 1 }
    const likedBlog = await blogService.update(id, liked)
    console.log(likedBlog)
    dispatch({
      type: 'LIKE',
      data: likedBlog.id
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    const id = blog.id
    const resp = await blogService.remove(id)
    console.log(resp)
    dispatch({
      type: 'DELETE',
      data: id
    })
  }
}

export default blogReducer