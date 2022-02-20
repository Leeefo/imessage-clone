import React, { forwardRef } from 'react';
import './Message.css';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
import * as timeago from 'timeago.js'


const Message = forwardRef(({ id, contents: {
  timestamp,
  email,
  displayName,
  photo,
  uid,
  message
} }, ref) => {


  const user = useSelector(selectUser)

  return (
    <div ref={ref} className={`message ${user.email === email && "message__sender"}`} >
      <Avatar className='message__photo' src={photo} />
      <p>{message}</p>
      <small>{timeago.format(new Date(timestamp?.toDate()))}</small>
    </div>
  )
})

export default Message