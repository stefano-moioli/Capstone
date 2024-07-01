import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Alert } from "react-bootstrap";
import axios from 'axios';

export default function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
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
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchProject();
  }, [id]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>{project.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{project.category}</Card.Subtitle>
          <Card.Text>{project.text}</Card.Text>
          <Card.Footer>
            <small className="text-muted">Author: {project.user.username}</small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Container>
  );
}
