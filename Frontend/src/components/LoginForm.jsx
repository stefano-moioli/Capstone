import axios from "axios";
import React, { useState } from "react";
import { Container, Form, Col, Row, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';

export default function LoginForm() {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const formHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3005/auth/login", user)
      .then((response) => {
        console.log('Login response:', response.data); // Log the response data
        setError(null);
        const token = response.data.token; // Extract the token
        login(token);
        navigate("/profile");
      })
      .catch((error) => {
        console.error('Error during login:', error); // Log the error
        setError(error.response ? error.response.data : { message: 'Unexpected error occurred' });
      });
  };

  return (
    <Container>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formEmail">
          <Col sm="10">
            <Form.Control type="email" name="email" placeholder="Email" onChange={formHandler} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPassword">
          <Col sm="10">
            <Form.Control type="password" name="password" placeholder="Password" onChange={formHandler} />
          </Col>
        </Form.Group>

        <Button type="button" className="bg-dark w-100" onClick={formSubmitHandler}>
          Login
        </Button>
      </Form>
      <Button type="button" className="bg-primary w-100 mt-2">
        Login with Google
      </Button>

      {error ? <Alert variant={"danger"} className="mt-3"> {error.message} </Alert> : ""}
    </Container>
  );
}
