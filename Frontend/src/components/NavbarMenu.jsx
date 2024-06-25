import React from "react";
import { Button, Container, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom";

export default function NavbarMenu() {
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Writ3r</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Button as={Link} to="/auth/login" className="me-3">
                      Login
                    </Button>
                    <Button as={Link} to="/auth/register" className="me-3">
                        Register
                    </Button>
                    <Navbar.Text>
                        Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}