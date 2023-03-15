import React, { useContext, useEffect } from 'react'
import Messages from './Messages'
import Input from "./Input"
import { ChatContext } from '../Context/ChatContext'

const Chat = () => {
    const { data } = useContext(ChatContext);

    const handleClose = () => {
        document.querySelector(".sidebar").style.display = "block"
        document.querySelector(".chat").style.display = "none"
    }
    //for responsive view
    useEffect(() => {
        window.onresize = () => {
            if(window.innerWidth > 480){
                document.querySelector(".sidebar").style.display = "block"
                document.querySelector(".chat").style.display = "block"
                
            } else if(window.innerWidth <=480){
                document.querySelector(".chat").style.display = "none"
            }
        }
    },[])

    return (
        <div className='chat'>
            <div className="chatInfo">
                <img src={data.user.photoURL} alt="" />
                <span>{data.user.displayName}</span>
                <button id='close-btn' onClick={handleClose}>X</button>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat
