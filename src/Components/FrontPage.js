import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import UseFirestore from '../Hooks/UseFirestore';
import PostPreview from './PostPreview';

import '../Styles/FrontPage.css';

export default function FrontPage() {
  const { currentUser } = useAuth();
  const [posts] = UseFirestore('posts');

  const listOfPosts = posts !== null && posts.map((post) => (
    <PostPreview key={post.id} postData={post} />  
  ));

  return (
    <div>
      Front Page
      {currentUser !== null ? (
        <div className='user-name'>
          {currentUser.email}
        </div>
      ) : (
        <Link className='log-in' to='/login'>Log in to account</Link>
      )}

      <Link to='/submitpost'>Submit Post</Link>

      {listOfPosts !== null && listOfPosts.length < 1 ? (
        <span>No Posts Found</span>
      ) : (
        listOfPosts
      )}
    </div>
  )
}
