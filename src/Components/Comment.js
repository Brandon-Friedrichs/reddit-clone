import React from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { firestore } from '../firebase';

export default function Comment({ commentData, parentPost }) {
  const { currentUser } = useAuth();
  const createdAt = (commentData.timestamp.toDate().toDateString() + ' at ' + commentData.timestamp.toDate().toLocaleTimeString());

  function deletePost() {
    firestore.collection('posts').doc(parentPost).collection('comments').doc(commentData.id).delete().then(() => {
      console.log('Comment deleted successfully')
    }).catch((error) => {
      console.error('Error deleting comment', error);
    });
  }

  return (
    <div className='comment-container'>
      <span className='comment-author'>
        {commentData.author} {' '}
        <span className='comment-data'>{createdAt}</span>
      </span>
      <p className='comment-text'>
        {commentData.comment}
      </p>
      {currentUser.email === commentData.author ? (
        <span className='delete-comment-btn' onClick={deletePost} >
          Delete
        </span>
      ) : (
        ''
      )}
    </div>
  )
}
