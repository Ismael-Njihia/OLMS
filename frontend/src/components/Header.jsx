import React from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../App.css';

const Header = () => {
  return (
    <header>
      <Navbar className='header' bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          {/* Left Side: Oshwal Library */}
          <LinkContainer to="/">
            <Navbar.Brand>Oshwal Library </Navbar.Brand>
          </LinkContainer>
          
         
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/notifications">
                <Nav.Link>
                  <FaBell />
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;