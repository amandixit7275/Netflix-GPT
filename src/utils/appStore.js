import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
//configureStore() will create the store & will also combine Reducers for us.
const appStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default appStore;
