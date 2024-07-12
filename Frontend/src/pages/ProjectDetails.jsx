import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Card, Form, Button, Alert, Image, CardText, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

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
      <Card className='mt-5 text-center' style={{boxShadow: "2px 5px 12px 3px rgb(11, 95, 11)"}}>
        <Card.Body>
          <Card.Title>{project.title}</Card.Title>

          

          <div className="d-flex justify-content-center gap-1">
         
          <Card.Text>
          <Link to={`/user/${project.user._id}/projects`}>  
          <Image src={project.user.avatar} alt="Avatar" roundedCircle style={{ width: '25px', height: '26px', objectFit: 'cover' }} />
          </Link>
          </Card.Text>
          
          <CardText>
          {project.user.username}
          </CardText>
        
          </div>

         
            

          <Card.Text>{project.category}</Card.Text>
        </Card.Body>
      </Card>
      <Card.Text className='mt-5' style={{borderBlockEnd: "1px solid #ced4da", paddingBottom: "20px"}} dangerouslySetInnerHTML={{ __html: project.text }} />
      
      <h4 className="mt-5 mb-4">Comments</h4>
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
                <div className="d-flex justify-content-start gap-1">
                <Link to={`/user/${comment.user._id}/projects`}>  
                {comment.user.avatar ? (<Image src={comment.user.avatar} alt="Avatar" roundedCircle style={{ width: '23px', height: '23px', objectFit: 'cover' }} />) : ("")}
          </Link>   
                <small className="text-muted">{comment.user.username}</small>
                </div>
                {comment.user._id === user?.id && (
                  <div className="mt-2">
                   <Button style={{backgroundColor: "transparent", border: "none", color: "black"}}><MdOutlineModeEdit onClick={() => { setEditCommentId(comment._id); setEditCommentText(comment.text)}}/></Button>
                   <Button style={{backgroundColor: "transparent", border: "none", color: "black"}}><RiDeleteBin5Line onClick={() => handleDeleteComment(comment._id)}/></Button>
                  </div>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      ))}
      <Form onSubmit={handleCommentSubmit} className="mt-5">
        <Form.Group>
          <Form.Label>Leave a comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </Form.Group>
        <Button style={{backgroundColor: "rgb(11, 95, 11)",
   border: "none"}} className="mt-3" type="submit">Submit</Button>
      </Form>
    </Container>
  );
}
