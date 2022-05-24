import React, { useEffect, useState } from 'react'
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore"
import { auth, db } from "../firebase-config";
import { async } from '@firebase/util';

function Home({isAuth}) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id );
    await deleteDoc(postDoc);
    getPosts();
  }

  useEffect(() => {
    getPosts();
  },[])
  
  return (
    <div className='homePage'>
      {postLists.map((post) => {
        return <div className='post' key={post.id}>
          <div className='postHeader'>
            <div className='companyInfo'> {post.companyInfo} </div>
            <div className='title'><h2> {post.title} </h2></div></div>
            <div className='deletePost'>
              { isAuth && post.author.id === auth.currentUser.uid && ( <button onClick={() => { deletePost(post.id) }}> X </button> ) }
            </div>
          <div className='postTextContainer'> { post.postText } </div>
          <h3>@{post.author.name}</h3>
        </div>
      })}
    </div>
  )
}

export default Home