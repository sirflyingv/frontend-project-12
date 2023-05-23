/* eslint-disable max-len */
/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import React, { useEffect /* useState */ } from 'react';
import {
  Container, Row, /* Nav, Button, */ /* , Col, */
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ChannelsPanel from './ChannelsPanel';
import ActiveChannel from './ActiveChannel';
import Modal from './Modal';
import { getModalContent } from './modal/index';
// import { useAuth } from '../Contexts';
import socket from '../ChatSocketAPI';

import fetchData from '../State/fetchData';

const MainPage = () => {
  // const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const authData = JSON.parse(localStorage.getItem('authData'));
      const { token } = authData;
      dispatch(fetchData(token));
      socket.connect();
    } catch (error) {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    socket.on('connect', () => { console.log('connected'); });
    socket.on('disconnect', () => { console.log('disconnected'); });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  // const handleLogOutButton = () => {
  //   localStorage.removeItem('authData');
  //   navigate('/login');
  //   auth.logOut();
  // };

  const modalOpened = useSelector((state) => state.modal.opened);
  const modalType = useSelector((state) => state.modal.type);
  const ModalConent = getModalContent(modalType);

  return (
    <div className="d-flex flex-column h-100">
      {/*
      <Nav variant="pills" className="shadow-sm navbar navbar-expand-lg navbar-light bg-white" defaultActiveKey="/home">
        <Container>
          <a href="/" className="navbar-brand">Hexlet Chat</a>
          <Button onClick={handleLogOutButton}>Выйти</Button>
        </Container>
      </Nav> */}
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="row h-100 bg-white flex-md-row">
          <ChannelsPanel />
          <ActiveChannel />
        </Row>
      </Container>
      {modalOpened ? <Modal><ModalConent /></Modal> : null}
    </div>
  );
};

export default MainPage;
