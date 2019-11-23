import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const testBlog = {
    title: 'Test blog',
    author: 'Tester',
    likes: 999,
    user: {
      username: 'hellas',
      name: 'Arto Hellas'
    },
    url: 'localhost/testurl'
  }

  const removeBlog = null

  const user = {
    username: 'hellas',
    name: 'Arto Hellas'
  }

  test('at start the details are not displayed', () => {
    component = render(
      <Blog blog={testBlog} removeBlog={removeBlog} user={user}>
        <div className="blog" />
      </Blog>
    )
    expect(component.container).toHaveTextContent(
      'Test blog'
    )
    expect(component.container).toHaveTextContent(
      'Tester'
    )
    const div = component.container.querySelector('.details')

    expect(div).toHaveStyle('display: none')
  })

  test('details are displayed when blog is clicked', () => {
    component = render(
      <Blog blog={testBlog} removeBlog={removeBlog} user={user}>
        <div className="blog" />
      </Blog>
    )
    const blog = component.getByText('Test blog by Tester')
    fireEvent.click(blog)

    const div = component.container.querySelector('.details')

    expect(div).not.toHaveStyle('display: none')
  })
})