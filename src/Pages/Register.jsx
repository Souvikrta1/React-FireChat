import React, { useState } from 'react'
import Profile from "../Images/Profile.png"
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { app, storage,db } from '../Firebase';
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Register = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const auth = getAuth(app);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target.Name.value;
        const email = e.target.Email.value;
        const password = e.target.Password.value;
        const file = e.target.File.files[0]

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                        setLoading(false);
                    }
                });
            });
        } catch (err) {
            setErr(true);
            setLoading(false);
        }
    }

    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className='logo'>FireChat</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Name' name='Name' />
                    <input type='email' placeholder='Email' name='Email' />
                    <input type='password' placeholder='Password' name='Password' />
                    <input type='file' id='file' accept='image/png , image/gif , image/jpeg , image/jpg' style={{ display: 'none' }} name="File" />
                    <label htmlFor='file' className='profile-add'><img src={Profile} alt="" height='30px' />Add a Profile Picture</label>
                    <button>Sign Up</button>
                    {err && <span>Something Went Wrong</span>}
                </form>
                <p>Do you have an account ? <Link to='/login'>Login</Link></p>
            </div>
        </div>
    )
}

export default Register
