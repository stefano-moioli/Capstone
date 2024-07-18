import React, { useState } from "react";
import { Button, Container, Navbar, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { RxHamburgerMenu } from "react-icons/rx";
import styles from '../navbar/style.css';

export default function NavbarMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar className="bg-white sticky-nav">
        <Container>
          <Navbar.Brand as={Link} to="/">Writ3r</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {!user ? (
              <>
                <Button as={Link} to="/auth/login" className="me-3 navButton">
                  Login
                </Button>
                <Button as={Link} to="/auth/register" className="me-3 navButton">
                  Register
                </Button>
                <Button as={Link} to="/auth/login" className="me-3 navButton d-block d-md-none">
                  Login
                </Button>
              </>
            ) : (
              <>
              <RxHamburgerMenu onClick={toggleSideNav} className="burgerMenu"/>
              <Row className="d-none">
                <Col>
                <Button variant="link" onClick={toggleSideNav}>
                </Button>
                <Link to="/profile" className="me-3">Profile</Link>
                <Button onClick={logout} className="me-3 navButton">Logout</Button>
                <Navbar.Text>
                  Signed in as: <Link to="/profile">{user.username}</Link>
                </Navbar.Text>
                </Col>
                </Row>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <div className={`side-nav ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSideNav}>&times;</button>
        <Link to="/profile" className="d-block mb-3" onClick={toggleSideNav}>Dashboard</Link>
        <Link to="/profile/edit" className="d-block mb-3" onClick={toggleSideNav}>Profile</Link>
        <Button onClick={() => { logout(); toggleSideNav(); }} className="d-block mb-3">Logout</Button>
      </div>
      {isOpen && <div className="overlay" onClick={toggleSideNav}></div>}
    </>
  );
}
