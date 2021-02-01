import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const createSurvey = createAsyncThunk(
//   "users/createSurvey",
//   async (_, thunkAPI) => {
//     const surveyId = String(thunkAPI.getState().surveys.length + 1);
//     return surveyId;
//   }
// );
export const userDataSlice = createSlice({
  name: "users",
  initialState: {},
  reducers: {
    addUserData: (state, action) => {
      const newState = {
        userId: action.payload.userId,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail,
        gitHubLink: action.payload.gitHubLink,
        linkedInLink: action.payload.linkedInLink,
        company: action.payload.company,
        designation: action.payload.designation,
        skills: action.payload.skills,
        followers: action.payload.followers,
        following: action.payload.following,
        posts: action.payload.posts,
        postsLiked: action.payload.postsLiked,
      }
      return newState
    },
    updateUserData: (state, action) => {
      const newState = action.payload;
      return newState;
    },
  },
  extraReducers: {},
});
