import {createSlice} from '@reduxjs/toolkit';

export const streamSlice = createSlice({
  name: 'stream',
  initialState: {
    value: null,
  },
  reducers: {
    setStreamPlatform: (state, action) => {
      state.value = action.payload ? action.payload : null;
    },
  },
});

// ACTIONS export
export const {setStreamPlatform} = streamSlice.actions;
export default streamSlice.reducer;