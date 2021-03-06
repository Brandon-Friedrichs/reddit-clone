import React from 'react';
import { Link } from 'react-router-dom';
import VoteOnPost from './VoteOnPost';
import DeletePost from './DeletePost';
import { ChatSquareText, Link45deg } from 'react-bootstrap-icons';

import '../Styles/PostPreview.css';

export default function PostPreview({ postData }) {
  const createdAt = (postData.timestamp.toDate().toDateString() + ' at ' + postData.timestamp.toDate().toLocaleTimeString());

  return (
    <div className='post-preview-container'>

          <VoteOnPost postData={postData} postId={postData.id} />

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

          <div className='post-preview'>
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

            <span className='post-preview-func'>
              <Link className='comments-link' to={`/layer/${postData.subreddit}/${postData.id}`} >
                Comments
              </Link>
              <DeletePost postData={postData} />
            </span>
          </div>

    </div>
  )
}
