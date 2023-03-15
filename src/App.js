import React, { useContext } from 'react'
import "./Style.css"
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'


const App = () => {
    const {currentUser} = useContext(AuthContext);

    const ProtectedRoute = ({children}) =>{
        if(!currentUser){
            return <Navigate to="/Login"/>
        }
        return children;
    }


    return (
        <BrowserRouter>
            <Routes>
                    <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
                    <Route path='Login' element={<Login />} />
                    <Route path='Register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
