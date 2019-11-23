import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
jest.mock('./services/blogs')
import { render, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

describe('<App />', () => {
  test('only login form is rendered if no user has logged in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('h2')
    )

    expect(component.container).toHaveTextContent(
      'log in to blog application'
    )
    expect(component.container).not.toHaveTextContent(
      'Blogs'
    )
    const blog = component.container.querySelector('.blog')
    expect(blog).toBeNull()
  })

  test('blogs are rendered if a user has logged in', async () => {
    const user = {
      username: 'tester',
      name: 'Donald Test',
      token: '1231231214'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('h2')
    )

    expect(component.container).toHaveTextContent(
      'Blogs'
    )
    expect(component.container).not.toHaveTextContent(
      'log in to blog application'
    )
    const blog = component.container.querySelector('.blog')
    expect(blog).not.toBeNull()
  })
})

