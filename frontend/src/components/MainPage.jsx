import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setChannels } from '../state/channelsSlice';
import { setMessages } from '../state/messagesSlice';
import { dataUrl } from '../routes/apiRoutes';
import ChannelsPanel from './ChannelsPanel';
import ActiveChannel from './ActiveChannel';
import Modal from './Modal';
import { getModalContent } from './modal/index';
import { useAuth } from '../contexts';
import appRoutes from '../routes/appRoutes';
// import fetchData from '../fetchData';

const MainPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const { token } = auth.getUserData();
    const fetchData111 = async () => {
      try {
        const { data } = await axios.get(dataUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setMessages(data.messages));
        dispatch(setChannels({ channels: data.channels, currentChannelId: data.currentChannelId }));
      } catch (error) {
        if (error.response.status === 401) {
          navigate(appRoutes.loginPage);
        }
      }
    };
    fetchData111();
  }, [auth, dispatch, navigate]);

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
