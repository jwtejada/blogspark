import { async } from '@firebase/util';
import React, { useEffect, useState } from 'react'
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from '../firebase-config';
import { useNavigate } from "react-router-dom";

function CreatePost({isAuth}) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [companyInfo, setCompanyInfo] = useState("");

  const postsCollectionRef = collection(db, "posts")
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      companyInfo,
      title, 
      postText, 
      author: { name:auth.currentUser.displayName, id:auth.currentUser.uid },
    });
    navigate("/");
  }
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  })
  return (
    <div className='createPostPage'>
      <div className='cpContainer'>
        <h1>Write a Report</h1>
        <div className='inputGp'> 
          <label> Report MC,DOT or Company Name</label>
          <input placeholder="Company Info" onChange={(event) => {setCompanyInfo(event.target.value)}} />
        </div>
        <div className='inputGp'> 
          <label>Report Title</label>
          <input placeholder="Report Title" onChange={(event) => {setTitle(event.target.value)}} />
        </div>
        <div className='inputGp'> 
          <label>Report:</label>
          <textarea placeholder='Write your report' onChange={(event) => {setPostText(event.target.value)}}/>
        </div>
        <button onClick={createPost}> Submit Report</button>
      </div>
    </div>
  )
}

export default CreatePost