import React, { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleDisplay = () => {
    setVisible(!visible)
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title}
          <button onClick={toggleDisplay}>hide</button>
        </div>
        <div>
          {blog.author}
        </div>
        <div>
          Likes: {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>
          {blog.url}
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} 
        <button onClick={toggleDisplay}>view</button>
      </div>
    )
  }
}

export default Blog
