import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Homepage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('userLogin');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get('http://localhost:3005/users', config);
        setUsers(response.data);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <Container>
      <h1 className="text-center mt-2">Users</h1>
      <Row className="mt-5">
        {users.map(user => (
          <Col key={user._id} md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Link to={`/user/${user._id}/projects`}>
                  <Button variant="primary">View Projects</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}