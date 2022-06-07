import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "userProfile",
  initialState: {
    user: JSON.parse(localStorage.getItem("currentUser") || "{}"),
  },
  reducers: {
    userDataChange: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload;
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});
export const fetchPosts = createSlice({
  name: "getPosts",
  initialState: {
    posts: {},
    saved: [],
    newPost: false,
  },
  reducers: {
    postsData: (state, action) => {
      state.posts = action.payload;
    },
    isNewPost: (state, action) => {
      state.newPost = !state.newPost;
    },
    savedPosts: (state, action) => {
      state.saved = action.payload;
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});
export const { userDataChange } = userDataSlice.actions;
export const { postsData, isNewPost,savedPosts } = fetchPosts.actions;
