import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { LayersHalf } from 'react-bootstrap-icons';

export default function Banner() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const { subreddit } = useParams();

  async function handleLogout() {
    //setError('');
    try {
      await logout();
      history.push('/login');
    } catch {
      //setError('Failed to log out');
    }
  }

  return (
    <div className='banner-container'>
      <h2 className='banner-title'>
        {subreddit !== undefined ? (
          <div className='banner-title-icon'>
            <LayersHalf className='layer-icon' />
            {subreddit}
          </div>
        ) : (
          <div className='banner-title-icon'>
            <LayersHalf className='layer-icon' />
            Layer
          </div>
        )}
      </h2>

      {currentUser !== null ? (
        <div className='user-info-container'>
          <Link to={`/user/${currentUser.email}`}>{currentUser.email}</Link>
          <div className='vertical-spacer'></div>
          <span className='log-out-btn' onClick={handleLogout}>Log Out</span>
        </div>
      ) : (
        <div className='user-info-container'>
          <Link className='log-in' to='/login'>Log in to account</Link>
        </div>          
      )}
    </div>
  )
}
