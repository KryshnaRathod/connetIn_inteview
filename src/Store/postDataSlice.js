import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const postDataSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    addNewPostList: (state, action) => {
      const { postList } = action.payload;
      let tempPostList = { ...state };
      tempPostList = postList;
      return tempPostList;
    },
    addNewPost: (state, action) => {
      const { post } = action.payload;
      return [post, ...state];
    },
  },
  extraReducers: {},
});
