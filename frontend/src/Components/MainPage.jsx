/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */

import React, { useEffect /* useState */ } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../Contexts';

import { fetchData, selectors } from '../redux/dataSlice';

const MainPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector(selectors.selectAll);

  useEffect(() => {
    const { localStorage } = window;
    const authTokenItem = JSON.parse(localStorage.getItem('authToken'));
    if (!authTokenItem) {
      navigate('/login');
    } else {
      auth.logIn();
      dispatch(fetchData(authTokenItem.token));
    }
  }, [auth, dispatch, navigate]);

  return (
    <h1>{JSON.stringify(data)}</h1>
  );
};

export default MainPage;
