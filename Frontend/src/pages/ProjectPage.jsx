import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form, Alert, CardBody } from 'react-bootstrap';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
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

        const response = await axios.get(`http://localhost:3005/projects/${id}`, config);
        setProject(response.data);
        setTitle(response.data.title);
        setCategory(response.data.category);
        setText(response.data.text);
      } catch (error) {
        setError(error.response?.data?.message || 'Errore nel recupero del progetto');
      }
    };

    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('userLogin');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.delete(`http://localhost:3005/projects/${id}`, config);
      navigate('/profile');
    } catch (error) {
      setError(error.response?.data?.message || 'Errore durante l\'eliminazione del progetto');
    }
  };

  const handlePublish = async () => {
    try {
      const token = localStorage.getItem('userLogin');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.patch(`http://localhost:3005/projects/${id}/publish`, {}, config);
      const response = await axios.get(`http://localhost:3005/projects/${id}`, config);
      setProject(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Errore durante la pubblicazione del progetto');
    }
  };

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem('userLogin');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const updatedProject = { title, category, text };
      const response = await axios.put(`http://localhost:3005/projects/${id}`, updatedProject, config);
      setProject(response.data);
      setIsEditing(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Errore durante la modifica del progetto');
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'align',
    'link', 'image', 'video'
  ];

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
          {isEditing ? (
            <>
              <Form>
                <Form.Group controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="romanzo">Romanzo</option>
                    <option value="saggio">Saggio</option>
                    <option value="poesia">Poesia</option>
                    <option value="racconto">Racconto</option>
                    <option value="testo sperimentale">Testo Sperimentale</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formText" className="mt-3">
                  <Form.Label>Text</Form.Label>
                  <ReactQuill
                    theme="snow"
                    value={text}
                    onChange={setText}
                    modules={modules}
                    formats={formats}
                  />
                </Form.Group>
              </Form>
              <Button className="mt-3" variant="primary" onClick={handleEdit}>
                Save Changes
              </Button>
            </>
          ) : (
            <>
            <Card className='mt-5 text-center' style={{boxShadow: "2px 5px 12px 3px rgb(11, 95, 11)"}}>
              <CardBody>
              <Card.Title>{project.title}</Card.Title>
              <Card.Text>{project.category}</Card.Text>
              </CardBody>
            </Card>
              <Card.Text className='mt-5' dangerouslySetInnerHTML={{ __html: project.text }} />
            </>
          )}
          <Button variant="warning" className="mt-3" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Modify'}
          </Button>
          <Button variant="danger" className="mt-3 ms-2" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="success" className="mt-3 ms-2" onClick={handlePublish}>
            {project.published ? 'Unpublish' : 'Publish'}
          </Button>
        
    </Container>
  );
}
