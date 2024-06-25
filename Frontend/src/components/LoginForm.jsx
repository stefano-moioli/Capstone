import axios from "axios";
import React, { useState } from "react";
import { Container, Form, Col, Row, Button, Alert } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function LoginForm(){

  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formHandler = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  const formSubmitHandler = (e) =>{
    axios.post("http://localhost:3005/auth/login", user)
    .then(response =>{
      setError(null);
      localStorage.setItem("userLogin", response.data)
      navigate("/profile")
    })
    .catch(error => setError(error.response.data))
  }

    return(
        <Container>
        <Form>
       
        <Form.Group as={Row} className="mb-3" controlId="formEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control type="email" name="email" placeholder="email" onChange={formHandler}/>
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} className="mb-3" controlId="formPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" name="password" placeholder="Password" onChange={formHandler}/>
          </Col>
        </Form.Group>


        <Button type="button" className="bg-dark w-50" onClick={formSubmitHandler}> Login </Button>
      </Form>
      <Button type="button" className="bg-dark w-50 mt-2"> Login with Google</Button>

      { error ? <Alert variant={"danger"} className="mt-3"> {error.message} </Alert> : ""}

      </Container>

    )
}