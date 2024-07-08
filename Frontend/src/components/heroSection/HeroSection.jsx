import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from '../heroSection/style.css';

export default function HeroSection() {
    return (
        <Container fluid className="heroSectionContainer">
            <main>
                <div className="heroSection">
                    <h1>Writ3r</h1>
                    <p>
                        The social network for writers. Where you can write, share and comment on.
                    </p>
                </div>
            </main>
        </Container>
    )
}