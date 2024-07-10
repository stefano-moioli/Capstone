import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from '../heroSection/style.css';
import { Link } from 'react-router-dom'

export default function HeroSection() {
    return (
        <Container fluid className="heroSectionContainer">
            <main>
                <Container>
                <div className="heroSection">
                    <h1>Writ3r</h1>
                    <p>
                        The social network for writers. Where you can write, share and discuss your writings.
                    </p>
                    <Button as={Link} to="/auth/register" className="mt-3 navButton">
                Start writing now
              </Button>
                </div>
                </Container>
            </main>
        </Container>
    )
}