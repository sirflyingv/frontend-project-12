import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { dataUrl } from './routes/apiRoutes.js';

const fetchData = createAsyncThunk(
  'data/fetchData',
  async (token) => {
    const { data } = await axios.get(dataUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
);

export default fetchData;
