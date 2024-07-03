import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('userLogin');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(`http://localhost:3005/projects/${id}`, config);
        setProject(response.data);
        setTitle(response.data.title);
        setCategory(response.data.category);
        setText(response.data.text);
      } catch (error) {
        setError(error.response?.data?.message || 'Errore nel recupero del progetto');
      }
    };

    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    try {
        const token = localStorage.getItem('userLogin');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        await axios.delete(`http://localhost:3005/projects/${id}`, config);
        navigate('/profile');
    } catch (error) {
        setError(error.response?.data?.message || 'Errore durante l\'eliminazione del progetto');
    }
};

  const handlePublish = async () => {
    try {
      const token = localStorage.getItem('userLogin');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.patch(`http://localhost:3005/projects/${id}/publish`, {}, config);
      const response = await axios.get(`http://localhost:3005/projects/${id}`, config);
      setProject(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Errore durante la pubblicazione del progetto');
    }
  };

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem('userLogin');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const updatedProject = { title, category, text };
      const response = await axios.put(`http://localhost:3005/projects/${id}`, updatedProject, config);
      setProject(response.data);
      setIsEditing(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Errore durante la modifica del progetto');
    }
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Card className="mt-5">
        <Card.Body>
          {isEditing ? (
            <>
              <Form>
                <Form.Group controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formCategory" className="mt-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formText" className="mt-3">
                  <Form.Label>Text</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </Form.Group>
              </Form>
              <Button className="mt-3" variant="primary" onClick={handleEdit}>
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Card.Title>{project.title}</Card.Title>
              <Card.Text>{project.category}</Card.Text>
              <Card.Text>{project.text}</Card.Text>
            </>
          )}
          <Button variant="warning" className="mt-3" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Modify'}
          </Button>
          <Button variant="danger" className="mt-3 ms-2" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="success" className="mt-3 ms-2" onClick={handlePublish}>
            {project.published ? 'Unpublish' : 'Publish'}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}