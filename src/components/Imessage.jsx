import React from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat'
import './Imessage.css'

const Imessage = () => {
  return (
    <div className='imessage'>
      <Sidebar />
      <Chat />
    </div>
  )
}

export default Imessage