import React from 'react'

const Notification = (props) => {
  const message = props.message
  const type = props.type

  if (message === null) {
    return null
  }
  if (type === 'success') {
    return (
      <div className="notification">
        { message }
      </div>
    )
  }
  return (
    <div className="error">
      { message }
    </div>
  )
}

export default Notification