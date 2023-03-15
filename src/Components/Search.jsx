import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from "../Firebase"
import { AuthContext } from '../Context/AuthContext'

const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);

    // searching if user is available
    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName", "==", username)
        )

        try {
            const querySnapshot = await getDocs(q);

            //to show user found or not
            if(querySnapshot.docChanges()[0]){
                setErr(false);
            } else {
                setErr(true);
                setTimeout(()=>{
                    setErr(false)
                },2000)
            }

            //set user 
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {

        }
    };

    const handleKey = (e) => {
        if (e.code === "Enter") {
            handleSearch();
        }
        
    };

    const handleSelect = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            //firebase method
            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                //create user chats for currentuser/user1
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                //create user chats for other user/user2
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch (err) { }

        setUser(null);
        setUsername("")
    };

    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder="Find a user"
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </div>
            {err && <span>User not found!</span>}
            {user && (
                <div className="userChat" onClick={handleSelect}>
                    <img src={user.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{user.displayName}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;