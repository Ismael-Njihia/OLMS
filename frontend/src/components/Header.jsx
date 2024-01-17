import React from 'react';
import { FaBell, FaUser } from 'react-icons/fa';
import { FaBox } from 'react-icons/fa';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../App.css';
import { useSelector } from 'react-redux';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userType = localStorage.getItem('user_type');
  const userType_ = userType?.replace(/['"]+/g, '');
  const allowed = userType_ === 'admin' || userType_ === 'staff';
  console.log(allowed); 
  return (
    <header className='custom-header'>
      <Navbar className='header'  expand="lg" collapseOnSelect>
        <Container>
          {/* Left Side: Oshwal Library */}
          <LinkContainer to="/" style={{color: "#fff", fontSize:"25px", fontWeight:"bold"}}>
            <Navbar.Brand>Oshwal Library </Navbar.Brand>
          </LinkContainer>
          
         
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/**Cart is only showed if allowed is true */}
            <Nav className="ms-auto">
            {allowed && (
              
                <LinkContainer to="/cart" style={{color: "#fff"}}>
                  <Nav.Link>
                    <FaBox />
                  </Nav.Link>
                </LinkContainer>
              
            )}
            
              {userInfo ? (
                <LinkContainer to="/profile" style={{color: "#fff"}}>
                  <Nav.Link>
                    <FaUser /> {userInfo.username}
                  </Nav.Link>
                </LinkContainer>
              ) : 
              <LinkContainer to="/login" style={{color: "#fff"}}>
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
