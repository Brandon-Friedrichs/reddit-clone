import React, { useState } from 'react';
import { firestore, timestamp } from '../firebase';
import { useAuth } from '../Contexts/AuthContext';
import { useHistory } from 'react-router-dom';

import '../Styles/SubmitPost.css';

export default function SubmitLinkPost() {
  const { currentUser } = useAuth();
  const [postUrl, setPostUrl] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [postLayer, setPostLayer] = useState('');
  const history = useHistory();
  const postsRef = firestore.collection('posts');

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await postsRef.add({
        url: postUrl,
        title: postTitle,
        description: postText,
        subreddit: postLayer,
        author: currentUser.email,
        timestamp: timestamp
      });
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='submit-post-container'>
      <h2>Submit Post</h2>
      <form className='post-form' onSubmit={handleSubmit}>
        <label>
          Url {' '}
          <br />
          <input 
            className='post-url-input'
            type='text'
            value={postUrl}
            onChange={(e) => setPostUrl(e.target.value)}
            required />
        </label>

        <label>
          Title {' '}
          <br />
          <input 
            className='post-title-input'
            type='text'
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required />
        </label>

        <label>
          Text {' '}
          <br />
          <textarea 
              className='post-text-input'
              type='text'
              value={postText}
              onChange={(e) => setPostText(e.target.value)} />
        </label>

        <label>
          Layer {' '}
          <br />
          <input 
            className='post-layer-input'
            type='text'
            value={postLayer}
            onChange={(e) => setPostLayer(e.target.value)}
            required />
        </label>

        <button className='post-submit' type='submit'>Submit Post</button>
      </form>
    </div>
  )
}