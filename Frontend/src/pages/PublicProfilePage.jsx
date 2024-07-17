import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Alert, Button, Image } from "react-bootstrap";
import axios from 'axios';

export default function PublicProfilePage() {
  const { userId } = useParams();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

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
        setProjects(response.data.projects);
        setUser(response.data.user);
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
    <Container className="mt-5">
     

      <Row className="mt-3 align-items-center" style={{borderBottom: "1px solid #ced4da"}}>
        <Col className="text-center">
        <h3 className="mt-3">{user.username}</h3>
          {user.avatar && <Image src={user.avatar} className="mb-3" alt="Avatar" roundedCircle style={{ width: '85px', height: '85px', objectFit: 'cover', boxShadow: "2px 5px 12px 3px rgb(11, 95, 11)" }} />}
        </Col>
      </Row>

      <Row className="mt-5">
        {projects.map(project => (
          <Col key={project._id} md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{project.category}</Card.Text>

                <div className="d-flex justify-content-start gap-1">
                <Link to={`/user/${project.user._id}/projects`}>  
                {project.user.avatar ? (<Image src={project.user.avatar} alt="Avatar" roundedCircle style={{ width: '23px', height: '23px', objectFit: 'cover' }} />) : ("")}
          </Link>   
                <small className="text-muted">{project.user.username}</small>
                </div>


                <Card.Text className="mt-3">
                  <Link to={`/project/${project._id}`}>
                    <Button style={{backgroundColor: "rgb(11, 95, 11)", border: "none"}}>View & Comment</Button>
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
