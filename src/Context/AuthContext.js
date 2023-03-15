import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState({})

    useEffect(()=>{
        //Giving us user logged in or not
        const unsub = onAuthStateChanged(getAuth(app),(user)=>{
            setCurrentUser(user)
        });

        return () =>{
            unsub()
        }
    },[])
    
    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}