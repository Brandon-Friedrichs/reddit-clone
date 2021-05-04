import React from 'react';
import { Link } from 'react-router-dom';
import SearchLayers from './SearchLayers';

import '../Styles/SideBar.css';

export default function SideBar({ uniqueLayers = [] }) {
    return (
    <div className='sidebar-container'>
      <Link className='submit-post-btn' to='/submitpost'>Submit Text Post</Link>
      <Link className='submit-post-btn' to='/submitlinkpost'>Submit Link</Link>

      <SearchLayers uniqueLayers={uniqueLayers} />

    </div>
  )
}
