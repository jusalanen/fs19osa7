const notificationReducer = (state = [{ message: null, type: null }], action) => {
  switch (action.type) {

  case 'SET_NOTIFICATION':
    return action.data

  default:
    return state
  }
}

export const setMessage = ({ message, type }) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      message,
      type
    }
  }
}

export const hideMessage = () => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      message: null,
      type: null
    }
  }
}

export default notificationReducer