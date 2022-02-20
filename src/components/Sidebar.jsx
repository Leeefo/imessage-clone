import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import './Sidebar.css'
import SidebarChat from './SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from './../features/user/userSlice';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';

const SideBar = () => {

  const chatsRef = collection(db, 'chats')

  const [chats, setChats] = useState([])

  useEffect(() =>

    // Retrive a snapshot from the db everytime the data changes
    onSnapshot(
      chatsRef,
      snapshot => {
        // Here we will set Chats every time the app loads
        setChats(

          // Will get chat obj with id and data obj props
          snapshot.docs.map(
            doc => ({
              id: doc.id,
              data: doc.data()
            }))
        )
      }
    )

    , [])

  const user = useSelector(selectUser);


  const signOutApp = () => {
    signOut(auth);
  }

  const addChat = () => {
    const chatName = prompt("Please enter a chat name")
    if (chatName) {
      addDoc(chatsRef, {
        chatName
      })
    }
  }

  return (
    <div className='sidebar'>

      <div className="sidebar__header">
        <Avatar
          className='sidebar__avatar'
          src={user.photo}
          onClick={signOutApp}
        />
        <div className="sidebar__input">
          <SearchIcon />
          <input type="text" placeholder='Search' />
        </div>
        <IconButton
          onClick={addChat}
          variant="outlined"
          className='sidebar__inputButton'>

          <RateReviewOutlinedIcon

          />
        </IconButton>
      </div>
      <div className="sidebar__chats">
        {
          // Destrcuturing chat obj into {id, data} the destructring data to {chatName}
          chats.map(({ id, data: { chatName } }) =>
            <SidebarChat
              key={id}
              id={id}
              chatName={chatName}
            />
          )
        }

      </div>
    </div>
  )
}

export default SideBar