import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
  return (
    <>
      <Navbar bg='light' >
        <Link to='/'>Top Layer</Link>
      </Navbar>
    </>
  )
}
