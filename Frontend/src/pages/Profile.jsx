import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { Button, Container, Row, Col, Card, Image } from "react-bootstrap";
import {Link} from 'react-router-dom';
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
            <h1 className="text-center mt-2">Profile Page by {user.username}</h1>
            <Row className="mt-3 align-items-center">
        <Col className="text-center">
          {user.avatar && <Image src={user.avatar} alt="Avatar" roundedCircle style={{ width: '100px', height: '100px' }} />}
          <h3 className="mt-3">{user.username}</h3>
        </Col>
      </Row>
            <h2 className="text-center mt-2">Projects</h2>
            <Row className="mt-5">
        {profileData.projects.map(project => (
          <Col key={project._id} md={4} className="mb-3">
            <Link to={`/projects/${project._id}`}>
            <Card>
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{project.category}</Card.Text>
              </Card.Body>
            </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <Row>
        <Col className="text-center">
        <Link to="/projects/new">
        <Button className="w-50 mt-3">New Project</Button>
        </Link>
        </Col>
      </Row>

        </Container>
    );
};