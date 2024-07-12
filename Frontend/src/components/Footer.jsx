import React from "react";
import { Container, Row } from "react-bootstrap";

export default function Footer(){
    return(
        <footer
      style={{
        paddingTop: 50,
        paddingBottom: 50,
        textAlign: "center"
      }}
    >
      <Container className="mt-5" style={{padding: "10px"}}>
        {`${new Date().getFullYear()} - © Writ3r - The Social Network for Writers`}
      </Container>
    </footer>
    )
}