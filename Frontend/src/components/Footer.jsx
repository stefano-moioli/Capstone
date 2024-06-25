import React from "react";
import { Container } from "react-bootstrap";

export default function Footer(){
    return(
        <footer
      style={{
        paddingTop: 50,
        paddingBottom: 50,
        textAlign: "center"
      }}
    >
      <Container>{`${new Date().getFullYear()} - © Writ3r - The Social Network for Writers`}</Container>
    </footer>
    )
}