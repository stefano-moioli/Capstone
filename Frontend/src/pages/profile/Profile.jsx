import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/AuthContext";
import { Button, Container, Row, Col, Card, Image, Spinner } from "react-bootstrap";
import {Link} from 'react-router-dom';
import axios from 'axios';
import styles from '../profile/style.css'

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
        return (
          <Container className="text-center mt-5">
          <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </Container>
        )
        
    }
    
    return(
        <Container>
            <Row className="mt-3 align-items-center" style={{borderBottom: "1px solid #ced4da"}}>
        <Col className="text-center">
        <h3 className="mt-3">{user.username}</h3>
          {user.avatar && <Image src={user.avatar} className="mb-3" alt="Avatar" roundedCircle style={{ width: '85px', height: '85px', objectFit: 'cover', boxShadow: "2px 5px 12px 3px rgb(11, 95, 11)" }} />}
        </Col>
      </Row>
            <h2 className="text-center mt-5">Projects</h2>
            <Row className="mt-4">
        {profileData.projects.map(project => (
          <Col key={project._id} md={4} className="mb-3">
            <Link to={`/projects/${project._id}`} className="projectCard">
            <Card className="projectCard">
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
        <Button className="w-100 mt-3 projectButton">New Project</Button>
        </Link>
        </Col>
      </Row>

        </Container>
    );
};