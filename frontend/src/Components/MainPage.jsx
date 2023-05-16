/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import React, { useEffect /* useState */ } from 'react';
import {
  Container, Row, Nav, Button, /* , Col, */
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { /* useSelector, */ useDispatch } from 'react-redux';
import ChannelsPanel from './ChannelsPanel';
import ActiveChannel from './ActiveChannel';
import { useAuth } from '../Contexts';

import fetchData from '../State/fetchData';

const MainPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const authData = JSON.parse(localStorage.getItem('authData'));
      const { token } = authData;
      dispatch(fetchData(token));
    } catch (error) {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  const handleLogOutButton = () => {
    localStorage.removeItem('authData');
    navigate('/login');
    auth.logOut();
  };

  return (
    <div className="d-flex flex-column h-100">
      <Nav variant="pills" className="shadow-sm navbar navbar-expand-lg navbar-light bg-white" defaultActiveKey="/home">
        <Container>
          <a href="/" className="navbar-brand">Hexlet Chat</a>
          <Button onClick={handleLogOutButton}>Выйти</Button>
        </Container>
      </Nav>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="row h-100 bg-white flex-md-row">
          <ChannelsPanel />
          <ActiveChannel />
        </Row>
      </Container>
    </div>

  );
};

export default MainPage;
