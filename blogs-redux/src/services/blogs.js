import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs/'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  const blogs = response.data
  blogs.sort( (blog1, blog2) => {
    return blog2.likes - blog1.likes
  })
  return blogs
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(baseUrl + id, newObject)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(baseUrl + id, config)
  return response
}

export default { setToken, getAll, create, update, remove }