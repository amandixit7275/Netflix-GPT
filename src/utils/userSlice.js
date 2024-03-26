import { createSlice } from "@reduxjs/toolkit";
//createSlice() helps us to create the reducer & actions with a single object in an easier way, A slice contains the initialDate, reducers / functions
const userSlice = createSlice({
  name: "user",
  initialState: null,
  //reducer object, having reducer functionality
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
