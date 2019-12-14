import React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom'


const UserList = props => {

  return(
    <Router>
      <div>
        <h2>Users</h2>
        <table><tbody><tr><td width='120'>User</td><td>blogs added</td></tr>
          {props.users.map(user =>
            <tr key={user.id} ><td width='120'><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td></tr>
          )}
        </tbody></table>
      </div>
    </Router>
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