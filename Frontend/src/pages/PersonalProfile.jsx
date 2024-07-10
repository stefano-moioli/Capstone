import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from "../components/AuthContext";

export default function PersonalProfile() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State per gestire la modalità di modifica
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (avatar) {
      formData.append('avatar', avatar);
    }
    if (password) {
      formData.append('password', password);
    }

    try {
      const token = localStorage.getItem('userLogin');    
      const response = await axios.put('http://localhost:3005/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      setUser(response.data.user);
      setSuccess('Profile updated successfully');
      setIsEditing(false); // Disabilita la modalità di modifica dopo l'aggiornamento
    } catch (error) {
      setError('Error updating profile');
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <Container>
      <h1>Personal Profile</h1>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing} // Disabilita l'input se non è in modalità di modifica
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing} // Disabilita l'input se non è in modalità di modifica
          />
        </Form.Group>

        <Form.Group controlId="formAvatar">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
            disabled={!isEditing} // Disabilita l'input se non è in modalità di modifica
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!isEditing} // Disabilita l'input se non è in modalità di modifica
          />
        </Form.Group>

        {!isEditing ? (<Button className="mt-3" onClick={() => setIsEditing(true)}>Modify</Button>) : ("")}

        {isEditing ? (<Button type="submit" className="mt-3">Update Profile </Button>)
        :
        ("") 
        }
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {success && <Alert variant="success" className="mt-3">{success}</Alert>}
    </Container>
  );
}
