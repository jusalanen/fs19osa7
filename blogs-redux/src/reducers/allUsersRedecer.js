/*eslint-disable no-case-declarations*/
import userService from '../services/users'

const allUsersReducer = (state = [], action) => {
  switch(action.type) {

  case 'GET_USERS':
    return action.data

  default:
    return state
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'GET_USERS',
      data: users
    })
  }
}

export default allUsersReducer