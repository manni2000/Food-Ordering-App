import { createSlice } from "@reduxjs/toolkit";

const comments =
  localStorage.getItem("commentList") !== null
    ? JSON.parse(localStorage.getItem("commentList"))
    : [];

const setCommentFunc = (comment) => {
  localStorage.setItem("commentList", JSON.stringify(comment));
};

const initialState = {
  commentList: comments,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    post(state, action) {
      const newComment = action.payload;
      state.commentList.push(newComment);

      setCommentFunc(state.commentList.map((item) => item));
    },
  },
});

export const { post } = commentSlice.actions;
export default commentSlice.reducer;
