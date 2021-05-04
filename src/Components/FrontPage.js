import React from 'react';
import Banner from './Banner';
import SideBar from './SideBar';
import PostPreview from './PostPreview';

import '../Styles/FrontPage.css';

export default function FrontPage({ posts, uniqueLayers }) {
  const listOfPosts = posts !== null && posts.map((post) => (
    <PostPreview key={post.id} postData={post} />  
  ));

  return (
    <>
      <Banner />

      <SideBar uniqueLayers={uniqueLayers} />

      {listOfPosts !== null && listOfPosts.length < 1 ? (
        <span>No Posts Found</span>
        ) : (
          listOfPosts
      )}
    </>
  )
}
