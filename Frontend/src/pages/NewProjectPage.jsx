import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { Button, Container, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
       [{'align': []}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'align',
    'link', 'image', 'video'
  ];

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
            as="select" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required
          >
            <option value="">Select category</option>
            <option value="romanzo">Romanzo</option>
            <option value="saggio">Saggio</option>
            <option value="poesia">Poesia</option>
            <option value="racconto">Racconto</option>
            <option value="testo sperimentale">Testo Sperimentale</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formText">
          <Form.Label>Text</Form.Label>
          <ReactQuill 
            theme="snow" 
            value={text} 
            onChange={setText} 
            modules={modules} 
            formats={formats} 
            required 
          />
        </Form.Group>

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

        <Button type="submit" className="mt-3">Submit</Button>
      </Form>
    </Container>
  );
}
