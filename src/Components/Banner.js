import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { LayersHalf } from 'react-bootstrap-icons';

export default function Banner({ bannerHeader }) {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push('/login');
    } catch {
      alert('Failed to log out');
    }
  }

  return (
    <div className='banner-container'>
      <h2 className='banner-title-container'>
        {bannerHeader !== undefined ? (
          <div className='banner-title'>
            <LayersHalf className='layer-icon' />
            {bannerHeader}
            <Link className='top-layer-link' to='/'>Top Layer</Link>
          </div>
        ) : (
          <div className='banner-title'>
            <LayersHalf className='layer-icon' />
            Layer
          </div>
        )}
      </h2>

      {currentUser !== null ? (
        <div className='user-info-container'>
          <Link to={`/user/${currentUser.email}`}>{currentUser.email}</Link>
          <div className='vertical-spacer'></div>
          <span className='banner-log-out-btn' onClick={handleLogout}>Log Out</span>
        </div>
      ) : (
        <div className='user-info-container'>
          <Link className='log-in' to='/login'>Log in to account</Link>
        </div>          
      )}
    </div>
  )
}
