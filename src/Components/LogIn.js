import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../Contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import Banner from './Banner';

export default function LogIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const history = useHistory();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to log in to account');
      setLoading(false);
    }
  }

  return (
    <>
      <Banner bannerHeader='layer' />
      <Card>
        <Card.Body>
          <h2>Log In</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required></Form.Control>
            </Form.Group>
            <Button disabled={loading} type='submit'>Log In</Button>
          </Form>
          <Link to='/forgot-password'>Forgot Password?</Link>
        </Card.Body>
      </Card>
      <div>
        Don't have an account?
        <Link to='/signup'>Sign Up</Link>
      </div>
    </>
  )
}
