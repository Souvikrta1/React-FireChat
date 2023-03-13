import { getAuth, signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { app } from '../Firebase'
import Profile from "../Images/Profile.png"

const Navbar = () => {
    const {currentUser} = useContext(AuthContext);
    return (
        <div className='navbar'>
            <span className='logo-home'>FireChat</span>
            <div className='user'>
                <img src={currentUser.photoURL} alt=''/>
                <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(getAuth(app))}>Log Out</button>
            </div>
        </div>
    )
}

export default Navbar
