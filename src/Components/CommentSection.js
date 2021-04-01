import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { firestore } from '../firebase';
import { useParams } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';

export default function CommentSection() {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const newCommentRef = useRef();
  const [comments, setComments] = useState([]);
  const commentsRef = firestore.collection('posts').doc(id).collection('comments');

  useEffect(() => {
    commentsRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data(), };
      });
      setComments(documents);
    });
  }, [])
  
  //TODO: Refactor comment display.
  const listOfComments = comments !== [] && comments.map((comment) => (
    <div key={comment.id} >{comment.comment}</div>  
  ));

  async function submitComment(e) {
    e.preventDefault();
    try {
      await commentsRef.add({
        user: currentUser.email,
        comment: newCommentRef.current.value
      });
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={submitComment}>
          <Form.Group id='comment'>
            <Form.Label>Comment</Form.Label>
            <Form.Control type='text' ref={newCommentRef} required></Form.Control>
          </Form.Group>
        <Button type='submit'>Leave Comment</Button>
        </Form>
        {listOfComments}
      </Card.Body>
    </Card>
  )
}
