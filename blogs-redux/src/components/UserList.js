import React from 'react'
import { connect } from 'react-redux'

const UserList = props => {
  const setUsersVisible = props.setUsersVisible

  return(
    <div>
      <h2>Users</h2>
      <table><tbody><tr><td width='120'>User</td><td>blogs added</td></tr>
        {props.users.map(user =>
          <tr key={user.id} ><td width='120'>{user.name}</td>
            <td>{user.blogs.length}</td></tr>
        )}
      </tbody></table>
      <button onClick={() => setUsersVisible(false)}>hide users</button><br></br>
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