import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { auth } from '../Firebase';

const Login = () => {

    const [err,setErr] = useState(false);
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);

    useEffect(()=>{
        if(currentUser){
            navigate("/")
        }
    })

    // login 
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        try{
            await signInWithEmailAndPassword(auth,email,password);
            navigate("/")
        }catch(err){
            setErr(err)
        }
    }

    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className='logo'>FireChat</span>
                <span className='title'>Login</span>
                <form onSubmit={handleSubmit}>
                    <input type='email' placeholder='Email' name='email'/>
                    <input type='password' placeholder='Password' name='password'/>
                    <button>Log In</button>
                    {err && <span>Wrong Credintial / Not A User</span>}
                </form>
                <p>Don't have an account ? <Link to='/register'>Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login
