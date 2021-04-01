import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import UseFirestoreDocument from '../Hooks/UseFirestoreDocument';

export default function Post() {
  const { id } = useParams();
  const post = UseFirestoreDocument('posts', id);

  // TODO: Improve loading screen while post data is fetched.
  return (
    <>
      {post === null ? (
        <div>Loading</div>
      ) : (
        <Card>
          <Card.Title>
            {post.title}
          </Card.Title>
          <Card.Body>
            <p>
              {post.description}
            </p>
            <Button>Leave Comment</Button>
          </Card.Body>
        </Card>
      )}
    </>
  )
}