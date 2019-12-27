import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = (props) => {
  const handleLogin = props.handleLogin
  const password = props.password
  const username = props.username

  return (
    <Form onSubmit={handleLogin}>
      <Form.Field>
        <label>username</label>
        <input name="Username" { ...username} />
      </Form.Field>
      <Form.Field>
        <label>password</label>
        <input type='password' { ...password} />
      </Form.Field>
      <Button type="submit">login</Button>
    </Form>
  )
}

export default LoginForm