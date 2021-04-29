import React from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { firestore } from '../firebase';

export default function DeletePost({ postData }) {
const { currentUser } = useAuth();

function deletePost() {
  firestore.collection('posts').doc(postData.id).delete().then(() => {
    console.log('Post deleted successfully')
  }).catch((error) => {
    console.error('Error deleting post', error);
  });
}

  return (
    <>
      {currentUser !== null && currentUser.email === postData.author ? (
        <span className='delete-post-btn' onClick={deletePost} >
          Delete
        </span>
      ) : (
        ''
      )}
    </>
  )
}
