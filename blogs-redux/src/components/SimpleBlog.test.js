import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders title, author and likes', () => {
  const testBlog = {
    title: 'First test blog',
    author: 'Tester One',
    likes: 999
  }

  const component = render(
    <SimpleBlog blog={testBlog} />
  )

  expect(component.container).toHaveTextContent(
    'First test blog Tester One'
  )
  expect(component.container).toHaveTextContent(
    'blog has 999 likes'
  )
})

test('clicking button twice calls event handler 2 times', () => {
  const testBlog = {
    title: 'First test blog',
    author: 'Tester One',
    likes: 999
  }

  const handler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={testBlog} onClick={handler}/>
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(handler.mock.calls.length).toBe(2)
})