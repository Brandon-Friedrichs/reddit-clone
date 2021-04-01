import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PostPreview({ postData }) {

  //TODO: Style out div.
  return (
    <>
      <Card>
        <Card.Body>
          <Link to={`/post/${postData.id}`} >
            {postData.title}
          </Link>
          <div></div>
          <Link to={`/r/${postData.subreddit}`} >
            {`r/${postData.subreddit}`}
          </Link>
        </Card.Body>
      </Card>
    </>
  )
}
