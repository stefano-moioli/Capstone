import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import styles from "../navbar/style.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { RxHamburgerMenu } from "react-icons/rx";

export default function NavbarMenu() {
  const { user, logout } = useAuth();

  return (
    <Navbar className="bg-body-tertiary">
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
              <RxHamburgerMenu className="d-md-none"/>
            </>
          ) : (
            <>
              <Link to="/profile" className="me-3 ">Profile</Link>
              <Button onClick={logout} className="me-3 navButton">Logout</Button>
              <Navbar.Text>
                Signed in as: <Link to="/profile">{user.username}</Link>
              </Navbar.Text>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}