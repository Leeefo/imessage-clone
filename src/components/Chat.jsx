import React, { useEffect } from 'react'
import FlipMove from 'react-flip-move';
import './Chat.css'
import Message from './Message';
import { useState } from 'react'
import MicNoneIcon from '@material-ui/icons/MicNone';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectChatName, selectChatId } from './../features/chat/chatSlice';
import {
  collection, onSnapshot,
  orderBy, query, addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { selectUser } from '../features/user/userSlice';




const Chat = () => {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatName = useSelector(selectChatName)
  const chatId = useSelector(selectChatId)
  const user = useSelector(selectUser)
  const chatRef = collection(db, 'chats')
  const msgColRef = collection(db, `chats/${chatId}/messages`);
  const q = query(msgColRef, orderBy('timestamp', 'desc'))

  useEffect(() => {

    if (chatId) {


      // const ordered = orderBy(msgColRef)
      // const colRef = collection(db, docRef)
      const unsub = onSnapshot(q,

        snapshot =>
          setMessages(
            snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
            }))
          )
      )
    }

  }, [chatId])

  const sendMessage = (e) => {
    e.preventDefault()

    // FIREBASE MAGIC ...

    addDoc(msgColRef, {
      timestamp: serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      displayName: user.displayName,
      email: user.email
    })


    setInput("")
  }
  return (
    <div className='chat'>

      {/* CHAT HEADER */}
      <div className="chat__header">
        <h4>To: <span className='chat__name'>{chatName}</span></h4>
        <strong>Details</strong>
      </div>

      {/* CHAT MESSAGES */}
      <div className="chat__messages">
        <FlipMove>
          {messages.map(({ id, data }) =>

          (
            <Message
              key={id}
              contents={data}
            />

          ))}
        </FlipMove>

      </div>


      {/* CHAT INPUT */}
      <div className="chat__input">
        <form>
          <input
            placeholder='iMessage'
            ype="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={sendMessage}
          >Send Message</button>
        </form>
        <IconButton>
          <MicNoneIcon className='chat__mic' />
        </IconButton>
      </div>


    </div>
  )
}

export default Chat