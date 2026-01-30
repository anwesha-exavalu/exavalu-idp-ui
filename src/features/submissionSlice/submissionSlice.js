import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const submissionSlice = createSlice({
  name: 'submission',
  initialState: {
    sessionId: null,
  },
  reducers: {
    generateNewSessionId: (state) => {
      state.sessionId = uuidv4();
    },
    clearSessionId: (state) => {
      state.sessionId = null;
    },
  },
});


export const { generateNewSessionId, clearSessionId } = submissionSlice.actions;
export default submissionSlice.reducer;