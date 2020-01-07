import React from 'react'

const User = ({ user }) => {

  if ( user === undefined || user === null ) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>has added blogs:</p>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User