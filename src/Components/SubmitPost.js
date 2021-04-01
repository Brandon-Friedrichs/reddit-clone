import React, { useRef } from 'react';
import { firestore } from '../firebase';
import { Form, Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function SubmitPost() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const history = useHistory();
  const postsRef = firestore.collection('posts');

  // TODO: Prevent empty posts from being posted to the db.
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await postsRef.add({
        title: titleRef.current.value,
        description: descriptionRef.current.value
      });
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2>Submit Post</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' ref={titleRef} required></Form.Control>
            </Form.Group>
            <Form.Group id='title'>
              <Form.Label>Description</Form.Label>
              <Form.Control type='text' ref={descriptionRef} required></Form.Control>
            </Form.Group>
            <Button type='submit'>Submit Post</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
