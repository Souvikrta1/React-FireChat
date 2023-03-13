import React, { useContext } from 'react'
import "./Style.scss"
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'


const App = () => {
    const {currentUser} = useContext(AuthContext);

    const ProtectedRoute = ({children}) =>{
        if(!currentUser){
            return <Navigate to="/login"/>
        }
        return children;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                    <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
                    <Route path='Login' element={<Login />} />
                    <Route path='Register' element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
