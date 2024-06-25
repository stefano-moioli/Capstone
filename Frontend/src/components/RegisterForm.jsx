import React, { useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";



export default function RegisterForm(){

  const [user, setUser] = useState({});
  
  const formHandler = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  const formSubmitHandler = (e) =>{
    e.preventDefault();

    axios.post("http://localhost:3005/auth/register", user)
    .then(response => console.log(response))
    .catch(error => console.error(error))
  }


    return(
        <Container>
        <Form>
        <Form.Group as={Row} className="mb-3" controlId="formName">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" name="name" placeholder="name" onChange={formHandler}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formSurname">
          <Form.Label column sm="2">
            Surname
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" name="surname" placeholder="surname" onChange={formHandler}/>
          </Col>
        </Form.Group>

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

        <Form.Group as={Row} className="mb-3" controlId="formAvatar">
          <Form.Label column sm="2">
            Avatar
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" name="avatar" placeholder="avatar" onChange={formHandler}/>
          </Col>
        </Form.Group>

        <Button type="submit" className="bg-dark w-50" onClick={formSubmitHandler}> Register </Button>
 
      </Form>
      </Container>
    )
}