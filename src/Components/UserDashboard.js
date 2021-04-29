import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useAuth } from '../Contexts/AuthContext';
import { Link, useHistory, useParams } from 'react-router-dom';
import { firestore } from '../firebase';
import Banner from './Banner';
import PostPreview from './PostPreview';

import '../Styles/UserDashboard.css';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const { username } = useParams();
  console.log(username)
  const history = useHistory();

  async function handleLogout() {
    setError('');
    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  useEffect(() => {
    const query = firestore.collection('posts').where('author', '==', username).limit(10);
    console.log('useFirestore user has fired')
    const unsub = query.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data(), };
      });
      setPosts(documents);
    });
    return () => unsub();
  }, [username])

  const listOfPosts = posts !== null && posts.map((post) => (
    <PostPreview key={post.id} postData={post} />  
  ));

  return (
    <>
      <Banner />
      <div className='user-profile-container'>
        <h4>{username}</h4>
        {error && <Alert variant='danger'>{error}</Alert>}
        <span><strong>Email:</strong> {username}</span>
        {currentUser.email === username ? (
          <div className='profile-tools-container'>
            <Link className='update-profile-btn' to='/update-profile'>Update Profile</Link>
            <span className='log-out-btn' onClick={handleLogout}>Log Out</span>
          </div>
        ) : (
          ''
        )}
      </div>

      {listOfPosts !== null && listOfPosts.length < 1 ? (
        <span>No Posts Found</span>
        ) : (
          listOfPosts
      )}

    </>
  )
}