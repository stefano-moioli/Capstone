import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from 'axios';

export default function Profile(){
    
    const { user } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() =>{
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('userLogin');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.get('http://localhost:3005/profile', config);
                setProfileData(response.data);
            } catch (error) {
                setError(error.response.data.message);
            }
        };

        fetchProfileData();
    }, []);

    if(!profileData){
        return <p>Loading...</p>
    }
    
    return(
        <Container>
            <h1>Profile Page by {user.username}</h1>

            <h2>Projects</h2>
            <Row>
        {profileData.projects.map(project => (
          <Col key={project._id} md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{project.category}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        <Button>New Project</Button>
      </Row>

        </Container>
    );
};