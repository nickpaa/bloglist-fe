import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const blog = {
    title: 'test blog',
    author: 'nick',
    url: 'xyz.com',
    likes: 99
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test('blog renders title and author but not url or likes', () => {
    const titleAuthor = component.container.querySelector('.titleAuthor')
    const url = component.container.querySelector('.url')
    const likes = component.container.querySelector('.likes')

    expect(titleAuthor).toBeDefined()
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('blog renders url and likes when expanded', () => {
    const url = component.container.querySelector('.url')
    const likes = component.container.querySelector('.likes')

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })
})