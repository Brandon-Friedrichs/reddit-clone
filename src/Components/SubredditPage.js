import React from 'react';
import { useParams } from 'react-router-dom';
import Banner from './Banner';
import SideBar from './SideBar';
import PostPreview from './PostPreview';

import '../Styles/FrontPage.css';

export default function SubredditPage({ posts, uniqueLayers }) {
  const { subreddit } = useParams();

  const listOfPosts = posts !== null && posts.filter((post) => post.subreddit === subreddit)
    .map((post) => (
      <PostPreview key={post.id} postData={post} />  
    )
  );

  return (
    <>
      <Banner bannerHeader={subreddit} />
      
      <SideBar uniqueLayers={uniqueLayers} />

      {listOfPosts !== null && listOfPosts.length < 1 ? (
        <span>No Posts Found</span>
        ) : (
          listOfPosts
      )}
    </>
  )
}
