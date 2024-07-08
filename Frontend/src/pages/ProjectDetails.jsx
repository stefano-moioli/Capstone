import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

export default function ProjectDetails() {
  const { projectId } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
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

        const projectResponse = await axios.get(`http://localhost:3005/projects/${projectId}`, config);
        setProject(projectResponse.data);

        const commentsResponse = await axios.get(`http://localhost:3005/comments/${projectId}`, config);
        setComments(commentsResponse.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userLogin');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post('http://localhost:3005/comments', { projectId, text: commentText }, config);
      setComments([...comments, response.data]);
      setCommentText("");
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleEditComment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userLogin');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.put(`http://localhost:3005/comments/${editCommentId}`, { text: editCommentText }, config);
      setComments(comments.map(comment => comment._id === editCommentId ? response.data : comment));
      setEditCommentId(null);
      setEditCommentText("");
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('userLogin');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.delete(`http://localhost:3005/comments/${commentId}`, config);
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
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
      <Card>
        <Card.Body>
          <Card.Title>{project.title}</Card.Title>
          <Card.Text>{project.category}</Card.Text>
          <Card.Text>{project.text}</Card.Text>
        </Card.Body>
      </Card>
      <h3>Comments</h3>
      {comments.map(comment => (
        <Card key={comment._id} className="mb-3">
          <Card.Body>
            {editCommentId === comment._id ? (
              <Form onSubmit={handleEditComment}>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={editCommentText}
                    onChange={(e) => setEditCommentText(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit">Save</Button>
                <Button onClick={() => setEditCommentId(null)} variant="secondary">Cancel</Button>
              </Form>
            ) : (
              <>
                <Card.Text>{comment.text}</Card.Text>
                <small className="text-muted">- {comment.user.username}</small>
                {comment.user._id === user?.id && (
                  <div>
                    <Button onClick={() => { setEditCommentId(comment._id); setEditCommentText(comment.text); }} variant="warning" className="ml-2">Edit</Button>
                    <Button onClick={() => handleDeleteComment(comment._id)} variant="danger" className="ml-2">Delete</Button>
                  </div>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      ))}
      <Form onSubmit={handleCommentSubmit}>
        <Form.Group>
          <Form.Label>Leave a comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}
