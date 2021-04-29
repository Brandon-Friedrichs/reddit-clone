import React from 'react';
import UseFirestore from '../Hooks/UseFirestore';
import Banner from './Banner';
import SideBar from './SideBar';
import PostPreview from './PostPreview';

import '../Styles/FrontPage.css';

export default function FrontPage() {
  const [posts] = UseFirestore('posts');
  const uniqueLayers = posts !== null && [...new Set(posts.map(post => post.subreddit))];
  console.log(uniqueLayers)

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
