import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { Button, Container, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewProjectPage() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('userLogin');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post('http://localhost:3005/projects', { title, category, text }, config);
      navigate("/profile");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Container>
      <h1>New Project</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="formText">
          <Form.Label>Text</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={10} 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            required 
          />
        </Form.Group>

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

        <Button type="submit" className="mt-3">Submit</Button>
      </Form>
    </Container>
  );
}