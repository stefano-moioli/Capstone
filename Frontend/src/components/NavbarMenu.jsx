import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

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
              <Button as={Link} to="/auth/login" className="me-3">
                Login
              </Button>
              <Button as={Link} to="/auth/register" className="me-3">
                Register
              </Button>
            </>
          ) : (
            <>
              <Link to="/profile" className="me-3">Profile</Link>
              <Button onClick={logout} className="me-3">Logout</Button>
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