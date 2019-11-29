/* eslint-disable no-undef */
/*eslint-disable no-case-declarations*/
import blogService from '../services/blogs'

const initState = null

const userReducer = (state = initState, action) => {
  console.log(action)
  switch (action.type) {

  case 'SET_USER':
    return action.data

  case 'LOGOUT':
    return initState

  default:
    return state
  }
}

export const login = (user) => {
  return async dispatch => {
    window.localStorage.setItem(
      'loggedBlogAppUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      data: user,
    })
  }
}

export const setUser = (loggedUser) => {
  return async dispatch => {
    blogService.setToken(loggedUser.token)
    dispatch({
      type: 'SET_USER',
      data: loggedUser
    })
  }
}

export const logout = () => {
  window.localStorage.clear()
  return {
    type: 'LOGOUT'
  }
}


export default userReducer