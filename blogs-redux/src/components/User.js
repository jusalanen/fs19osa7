import React from 'react'
import { connect } from 'react-redux'

const UserList = props => {
  const setUsersVisible = props.setUsersVisible

  return(
    <div>
      <h2>Users</h2>
      <table><tbody><tr><td width='100'><p></p></td>
        <td></td>Added blogs</tr>
      {props.users.map(user =>
        <tr key={user.id} ><td width='100'><p>{user.name} </p></td>
          <td></td>{user.blogs.length}</tr>
      )}
      </tbody></table>
      <button onClick={() => setUsersVisible(false)}>hide</button><br></br>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    users: state.allUsers
  }
}

export default connect(
  mapStateToProps,
  null
)(UserList)