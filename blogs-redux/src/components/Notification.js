import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ message, type }) => {

  if (message === null || message === undefined ) {
    return null
  }
  if (type === 'success') {
    return (
      <div className="notification">
        { message }
      </div>
    )
  }
  if (type === 'error') {
    return (
      <div className="error">
        { message }
      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    type: state.notification.type
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)