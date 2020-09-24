import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('blog renders title and author but not url or likes', () => {
  const blog = {
    title: 'test blog',
    author: 'nick',
    url: 'xyz.com',
    likes: 99
  }

  const component = render(
    <Blog blog={blog} />
  )

  component.debug()

  const titleAuthor = component.container.querySelector('.titleAuthor')
  const url = component.container.querySelector('.url')
  const likes = component.container.querySelector('.likes')

  expect(titleAuthor).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()

  // expect(component.container).not.toHaveTextContent(
  //   'xyz.com'
  // )

  // expect(component.container).not.toHaveTextContent(
  //   '99'
  // )
})