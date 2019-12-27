import React from 'react'
import { connect } from 'react-redux'
import { Container, Message } from 'semantic-ui-react'

const Notification = ({ message, type }) => {

  if (message === null || message === undefined ) {
    return null
  }
  if (type === 'success') {
    return (
      <Container>
        <Message className="notification">
          {message}
        </Message>
      </Container>
    )
  }
  if (type === 'error') {
    return (
      <Container>
        <Message className="error">
          { message }
        </Message>
      </Container>
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