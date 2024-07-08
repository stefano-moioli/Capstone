import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Alert, Button } from "react-bootstrap";
import axios from 'axios';

export default function PublicProfilePage() {
  const { userId } = useParams();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('userLogin');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(`http://localhost:3005/user/${userId}/projects`, config);
        setProjects(response.data);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchProjects();
  }, [userId]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (projects.length === 0) {
    return <p>No projects found.</p>;
  }

  return (
    <Container>
      <h1 className="text-center mt-2">Public Profile</h1>
      <Row className="mt-5">
        {projects.map(project => (
          <Col key={project._id} md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{project.category}</Card.Text>
                <Card.Text dangerouslySetInnerHTML={{ __html: project.text }} />
                <Card.Footer>
                  <small className="text-muted">Author: {project.user.username}</small>
                  <Link to={`/project/${project._id}`}>
                    <Button>View & Comment</Button>
                  </Link>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
