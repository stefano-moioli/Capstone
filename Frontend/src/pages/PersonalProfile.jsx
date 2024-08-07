import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from "../components/AuthContext";

export default function PersonalProfile() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [username, setUsername] = useState(user?.username || '');
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
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
    formData.append('username', username);
    /*if (avatar) {
      formData.append('avatar', avatar);
    }*/
    formData.append('avatar', avatar);
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
      setIsEditing(false); 
    } catch (error) {
      setError('Error updating profile');
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <Container className='mt-5'>
      <h1>Personal Profile</h1>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing} 
          />
        </Form.Group>

        <Form.Group controlId="formUsername" className='mt-3'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!isEditing} 
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className='mt-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
          />
        </Form.Group>

        <Form.Group controlId="formAvatar" className='mt-3'>
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
            disabled={!isEditing}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className='mt-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!isEditing} 
          />
        </Form.Group>

        {!isEditing ? (<Button className="mt-3" 
        
        style={{backgroundColor: "rgb(11, 95, 11)",
          border: "none"}}
        
        onClick={() => setIsEditing(true)}>Modify</Button>) : ("")}

        {isEditing ? (<Button type="submit" className="mt-3"
        
        style={{backgroundColor: "rgb(11, 95, 11)",
        border: "none"}}
      
        
        >Update Profile </Button>)
        :
        ("") 
        }
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {success && <Alert variant="success" className="mt-3">{success}</Alert>}
    </Container>
  );
}
