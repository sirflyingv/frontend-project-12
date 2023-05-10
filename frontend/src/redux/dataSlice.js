/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable functional/no-expression-statements */
import axios from 'axios';

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
// import routes from '../routes.js';

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (token) => {
    const response = await axios.get('/api/v1/data', {
      headers: {
        'Content-Type': 'application/json',
        // eslint-disable-next-line quote-props
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

// export const sendTask = createAsyncThunk(
//   'tasks/sendTask',
//   async (task) => {
//     const { data } = await axios.post(routes.tasksPath(), task);
//     return data;
//   },
// );

// export const removeTask = createAsyncThunk(
//   'tasks/removeTask',
//   async (id) => {
//     await axios.delete(routes.taskPath(id));
//     return id;
//   },
// );

const dataAdapter = createEntityAdapter();
const initialState = dataAdapter.getInitialState();

const dataSlice = createSlice({
  name: 'tasks',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, dataAdapter.setOne);
  },
});
export const selectors = dataAdapter.getSelectors((state) => state.data);

export default dataSlice.reducer;
