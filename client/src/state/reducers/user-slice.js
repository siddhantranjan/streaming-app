import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload ? action.payload : null;
    },
    unsetUser: (state) => {
        state.value = null;
      },
  },
});

// ACTIONS export
export const {setUser, unsetUser} = userSlice.actions;
export default userSlice.reducer;