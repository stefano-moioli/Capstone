import React, { useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";



export default function RegisterForm() {

  const [user, setUser] = useState({});

  const formHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3005/auth/register", user)
      .then(response => console.log(response))
      .catch(error => console.error(error))
  }


  return (
    <Container className="d-flex justify-content-center align-items-center mt-4">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control type="text" name="name" placeholder="Name" onChange={formHandler} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Control type="text" name="username" placeholder="Username" onChange={formHandler} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control type="email" name="email" placeholder="Email" onChange={formHandler} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control type="password" name="password" placeholder="Password" onChange={formHandler} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAvatar">
              <Form.Control type="text" name="avatar" placeholder="Avatar" onChange={formHandler} />
            </Form.Group>

            <Button type="submit" className="loginButton w-100" onClick={formSubmitHandler}> Register </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}