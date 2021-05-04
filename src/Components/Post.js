import React from 'react';
import { useParams, Link } from 'react-router-dom';
import UseFirestoreDocument from '../Hooks/UseFirestoreDocument';
import Banner from './Banner';
import SideBar from './SideBar';
import VoteOnPost from './VoteOnPost';
import DeletePost from './DeletePost';
import CommentSection from './CommentSection';
import { ChatSquareText, Link45deg } from 'react-bootstrap-icons';

import '../Styles/Post.css';

export default function Post() {
  const { id } = useParams();
  const postData = UseFirestoreDocument('posts', id);
  const createdAt = postData !== null && (postData.timestamp.toDate().toDateString() + ' at ' + postData.timestamp.toDate().toLocaleTimeString());

  return (
    <>
      <Banner bannerHeader='layer' />
      <SideBar />

      {postData === null ? (
        <div>Loading</div>
      ) : (
        <div className='post-container'>

          <div className='post-vote-icon-container'>
            <VoteOnPost postData={postData} postId={id} />

            {postData.url ? (
              <a target='_blank' href={postData.url} rel="noreferrer">
                <div className='icon-container'>
                  <Link45deg className='link-icon'/>
                </div>
              </a>
            ) : (
              <Link to={`/layer/${postData.subreddit}/${postData.id}`} >
                <div className='icon-container'>
                  <ChatSquareText className='text-icon'/>
                </div>
              </Link>
            )}
          </div>

          <div className='post-details'>
            {postData.url ? (
              <a target='_blank' href={postData.url} rel="noreferrer">{postData.title}</a>
            ) : (
              <Link to={`/layer/${postData.subreddit}/${postData.id}`} >
                {postData.title}
              </Link>
            )}
            
            <span className='post-preview-info'>
              Submitted on {createdAt} by {' '}
              <Link to={`/user/${postData.author}`}>{postData.author}</Link>
              {' '} to the
              <Link to={`/layer/${postData.subreddit}`} >
                {` ${postData.subreddit} layer`}
              </Link>
            </span>
            
            {postData.description !== '' ? (
              <p className='post-text'>
                {postData.description}
              </p>
              ) : (
                ''
            )}

            <span className='post-preview-func'>
              <Link className='comments-link' to={`/layer/${postData.subreddit}/${postData.id}`} >
                Comments
              </Link>
              <DeletePost postData={postData} />
            </span>
          </div>


        </div>
      )}
      <CommentSection />
    </>
  )
}
