import React from 'react'
import { useParams } from 'react-router-dom';
import UseFirestoreSubreddit from '../Hooks/UseFirestoreSubreddit';
import Banner from './Banner';
import SideBar from './SideBar';
import PostPreview from './PostPreview';

import '../Styles/FrontPage.css';

export default function FrontPage() {
  const { subreddit } = useParams();
  const [posts] = UseFirestoreSubreddit('posts', subreddit);

  const listOfPosts = posts !== null && posts.map((post) => (
    <PostPreview key={post.id} postData={post} />  
  ));

  return (
    <>
      <Banner />
      
      <SideBar />

      {listOfPosts !== null && listOfPosts.length < 1 ? (
        <span>No Posts Found</span>
        ) : (
          listOfPosts
      )}
    </>
  )
}
