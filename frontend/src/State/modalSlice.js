import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  opened: false,
  type: '',
  subjectChannel: undefined,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { setModal } = modalSlice.actions;
export default modalSlice.reducer;
