import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageCategory, setMessageCategory] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const clearMessage = () => {
    setTimeout(() => {
      setMessage(null)
      setMessageCategory(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`${user.name} successfully logged in`)
      setMessageCategory('success')
      clearMessage()

    } catch (exception) {
      setMessage('incorrect credentials; please try again')
      setMessageCategory('error')
      clearMessage()
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      setMessage(`${user.name} logged out`)
      setMessageCategory('success')
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
      clearMessage()
    } catch (exception) {
      setMessage(`${user.name} not logged out; try again`)
      setMessageCategory('error')
      clearMessage()
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog entry" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const handleLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const returnedBlog = await blogService.update(id, updatedBlog)
    // await blogService.update(id, updatedBlog)
    setBlogs(blogs.map(b => b.id === id ? returnedBlog : b))
    // setBlogs(blogs.map(b => b.id === id ? { ...blog, likes: blog.likes + 1 } : b))
  }

  // compare function for sorting
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description
  // if function < 0, first ele sorts before second
  const byLikes = (b1, b2) => b2.likes - b1.likes

  const handleDelete = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const ok = window.confirm(`delete "${blog.title}"?`)
    if (ok) {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
    }
  }

  return (
    <div>
      <h1>Blog application</h1>
      <Notification message={message} messageCategory={messageCategory} />

      {user === null
        ? loginForm()
        : <div>
          <p>{user.name} is logged in</p>
          <form onSubmit={handleLogout}>
            <button type="submit">log out</button>
          </form>
          {blogForm()}
        </div>
      }

      <h2>List of blogs</h2>
      <div>
        {blogs.sort(byLikes).map(blog =>
          <Blog key={blog.id}
            blog={blog}
            handleLike={() => handleLike(blog.id)}
            handleDelete={() => handleDelete(blog.id)}
            own={user ? user.username === blog.user.username : false}
          />
        )}
      </div>
    </div>
  )

}

export default App