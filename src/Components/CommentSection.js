import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { firestore, timestamp } from '../firebase';
import { useParams } from 'react-router-dom';
import Comment from './Comment';

import '../Styles/CommentSection.css';

export default function CommentSection() {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    const commentsRef = firestore.collection('posts').doc(id).collection('comments');
    const unsub = commentsRef.onSnapshot((snapshot) => {
      console.log('Get comments useEffect fired');
      const documents = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data(), };
      });
      setComments(documents);
    });
    return () => unsub();
  }, [id])
  
  const listOfComments = comments !== [] && comments.map((comment) => (
    <Comment key={comment.id} commentData={comment} parentPost={id}/>
  ));

  async function submitComment(e) {
    e.preventDefault();
    const commentsRef = firestore.collection('posts').doc(id).collection('comments');
    try {
      await commentsRef.add({
        author: currentUser.email,
        comment: newComment,
        timestamp: timestamp
      });
      setNewComment('');
    } catch (error) {
      console.error(error);
    } 
  }

  return (
    <div className='comment-section-container'>
        <form className='comment-form' onSubmit={submitComment}>
          <textarea 
            className='comment-input'
            type='text'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required>
          </textarea>
          <button className='comment-submit' type='submit'>Submit Comment</button>
        </form>
        <div className='comment-section'>
          {listOfComments}
        </div>
    </div>
  )
}
