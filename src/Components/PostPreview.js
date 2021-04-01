import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PostPreview({ postData }) {
  return (
    <>
      <Card>
        <Card.Body>
          <Link to={`/post/${postData.id}`} >
            {postData.title}
          </Link>
        </Card.Body>
      </Card>
    </>
  )
}
