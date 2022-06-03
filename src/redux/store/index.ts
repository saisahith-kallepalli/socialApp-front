import { configureStore } from "@reduxjs/toolkit";
import { fetchPosts, userDataSlice } from "../reducers";
const reducers = {
  userData: userDataSlice.reducer,
  postsData:fetchPosts.reducer
};
const store = configureStore({
  reducer: reducers,
});
export default store;
