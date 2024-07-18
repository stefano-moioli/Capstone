import React, { useEffect, useState } from "react";
import { useAuth } from '../components/AuthContext';
import { Container, Row, Col, Card, Button, Alert, Spinner, Image, CardBody } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import axios from 'axios';

export default function Homepage() {
  const { user, followingUsers, setUser, setFollowingUsers } = useAuth();
  const [users, setUsers] = useState([]);
  const [feed, setFeed] = useState([]);
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

        /* if (!user || !user._id) {
          throw new Error("User not logged in or missing ID");
        }*/

        const updatedUsers = response.data.map(user => ({
          ...user,
          followed: followingUsers.some(followedUser => followedUser._id === user._id)
        }));

        setUsers(updatedUsers);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    fetchUsers();
  }, [followingUsers]);

  useEffect(() => {
    const fetchFeed = async () => {
      if (!user) return;

      try {
        const token = localStorage.getItem('userLogin');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get('http://localhost:3005/feed', config);
        const updatedFeed = response.data.map(project => ({
          ...project,
          user: {
            ...project.user,
            followed: followingUsers.some(followedUser => followedUser._id === project.user._id)
          }
        }));

        setFeed(updatedFeed);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    fetchFeed();
  }, [user, followingUsers]);

  const handleFollow = async (userId) => {
    try {
      const token = localStorage.getItem('userLogin');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.post(`http://localhost:3005/follow/${userId}`, {}, config);

      const updatedUsers = users.map(u => u._id === userId ? { ...u, followed: true } : u);
      setUsers(updatedUsers);

      const updatedFeed = feed.map(project => project.user._id === userId ? { ...project, user: { ...project.user, followed: true } } : project);
      setFeed(updatedFeed);

      setFollowingUsers(prevFollowing => [...prevFollowing, { _id: userId, username: users.find(u => u._id === userId).username }]);

      setUser(prevUser => ({
        ...prevUser,
        following: Array.isArray(prevUser.following) ? [...prevUser.following, { _id: userId }] : [{ _id: userId }]
      }));
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      const token = localStorage.getItem('userLogin');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      await axios.post(`http://localhost:3005/unfollow/${userId}`, {}, config);

      const updatedUsers = users.map(u => u._id === userId ? { ...u, followed: false } : u);
      setUsers(updatedUsers);

      const updatedFeed = feed.map(project => project.user._id === userId ? { ...project, user: { ...project.user, followed: false } } : project);
      setFeed(updatedFeed);

      setFollowingUsers(prevFollowing => prevFollowing.filter(followedUser => followedUser._id !== userId));

      setUser(prevUser => ({
        ...prevUser,
        following: prevUser.following.filter(followedUser => followedUser._id !== userId)
      }));
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (users.length === 0) {
    return (<Container className="mt-5 text-center"><Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner></Container>);
  }

  return (
    <Container className="mt-5">
      <Row className="text-center" style={{ borderBottom: "1px solid #ced4da", paddingBottom: "15px" }} >
        <Col>
          <Image className="me-2" src={user.avatar} alt="Avatar" roundedCircle style={{ width: '55px', height: '55px', objectFit: 'cover' }} />
          {user.username}
          <Link to="/projects/new">
            <Button className="projectButton ms-2">New Project</Button>
          </Link>
        </Col>
      </Row>


      <Row className="mt-5">
        <Col md={8}>
          
          {feed.map(project => (
            <Card style={{border: "none", borderBottom: "1px solid #ced4da"}} key={project._id} className="mb-5">
              <Card.Body>
                <Link to={`/project/${project._id}`} style={{ textDecoration: "none", color: "black" }}>
                  <Card.Title>{project.title}</Card.Title>
                </Link>
                <Card.Text>{project.category}</Card.Text>

                <div className="d-flex gap-1">
                  <Image src={project.user.avatar} alt="Avatar" roundedCircle style={{ width: '23px', height: '23px', objectFit: 'cover' }} />
                  <Link style={{ textDecoration: "none", color: "black" }} to={`/user/${project.user._id}/projects`}>{project.user.username}</Link>
                </div>

                {project.user.followed ? (
                  <Button style={{ border: "none", background: "transparent", color: "#c10505" }} onClick={() => handleUnfollow(project.user._id)}>Unfollow</Button>
                ) : (
                  <Button variant="success" className="ml-2" onClick={() => handleFollow(project.user._id)}>Follow</Button>
                )}

              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col md={4}>
          <h2 className="text-center">Suggested Users</h2>
          {users
            .filter(user => !user.followed)
            .map(user => (
              <Card key={user._id} className="mb-3">
                <Card.Body>
                  <div className="d-flex gap-1">
                    {user.avatar ? (
                      <Image src={user.avatar} alt="Avatar" roundedCircle style={{ width: '23px', height: '23px', objectFit: 'cover' }} />
                    ) : (
                      <CgProfile style={{ width: '23px', height: '23px' }} />
                    )}
                    <Link style={{ textDecoration: "none", color: "black" }} to={`/user/${user._id}/projects`}>{user.username}</Link>
                  </div>
                  {user.followed ? (
                    <Button variant="danger" className="ml-2" onClick={() => handleUnfollow(user._id)}>Unfollow</Button>
                  ) : (
                    <Button style={{ border: "none", background: "transparent", color: "rgb(11, 95, 11)" }} className="ml-2" onClick={() => handleFollow(user._id)}>Follow</Button>
                  )}
                </Card.Body>
              </Card>
            ))}
        </Col>
      </Row>


    </Container>
  );
}
