import React from 'react'

const Notification = ({message, messageCategory}) => {
  if (message === null) {
    return null
  } else {
    return (
      <div className={messageCategory}>
        {message}
      </div>
    )
  }
}

export default Notification