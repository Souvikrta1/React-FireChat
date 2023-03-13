import React from 'react'
import Sidebar from '../Components/Sidebar'
import Chat from '../Components/Chat'
import Search from '../Components/Search'

const Home = () => {
    return (
        <div className='home'>
            <div className='container'>
                <Sidebar/>
                <Chat/>
            </div>
        </div>
    )
}

export default Home
