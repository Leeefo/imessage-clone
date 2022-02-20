import React, { useState, useEffect } from 'react'
import './SidebarChat.css'
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectChatId, setChat } from '../features/chat/chatSlice';
import { onSnapshot, orderBy, query, collection } from 'firebase/firestore';
import { db } from '../firebase';
import * as timeago from 'timeago.js'

const SidebarChat = ({ id, chatName }) => {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);
  // const chatId = useSelector(selectChatId);
  const msgColRef = collection(db, `chats/${id}/messages`);
  const q = query(msgColRef, orderBy('timestamp', 'desc'))



  useEffect(() => {

    onSnapshot(q, snapshot => (
      setChatInfo(
        snapshot.docs.map(doc => doc.data())
      )
    ))



  }, [id])


  return (
    <div onClick={() => {
      dispatch(
        setChat({
          chatId: id,
          chatName: chatName
        })
      )
    }} className='sidebarChat'>
      <Avatar src={chatInfo[0]?.photo} />
      <div className="sidebarChat__info">
        <h3>{chatName}</h3>
        <p>{chatInfo[0]?.message}</p>
        <small>
          {timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}
        </small>
      </div>
    </div>
  )
}

export default SidebarChat