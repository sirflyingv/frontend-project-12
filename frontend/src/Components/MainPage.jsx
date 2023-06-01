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
import socket from '../ChatSocketAPI';
import fetchData from '../State/fetchData';

const MainPage = () => {
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

  const modalOpened = useSelector((state) => state.modal.opened);
  const modalType = useSelector((state) => state.modal.type);
  const ModalConent = getModalContent(modalType);

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="row h-100 bg-white flex-md-row">
          <ChannelsPanel />
          <ActiveChannel />
        </Row>
      </Container>
      {modalOpened ? <Modal><ModalConent /></Modal> : null}
    </>
  );
};

export default MainPage;
