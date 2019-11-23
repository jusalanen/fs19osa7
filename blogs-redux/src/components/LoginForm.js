import React from 'react'

const LoginForm = (props) => {
  const handleLogin = props.handleLogin
  const password = props.password
  const username = props.username

  return (
    <form onSubmit={handleLogin}>
      <div>
        username <input
          {...username}
          name="Username" />
      </div>
      <div>
        password <input
          {...password}
          name="Password" />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm