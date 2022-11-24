import { createSlice } from "@reduxjs/toolkit";
import data from "../../data/data.json";
const initialState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : data.comments;

export const commentsSlice = createSlice({
  name: "comments",
  initialState: !initialState[0].reactions
    ? initialState.map((comment) => {
        comment.reactions = {};
        comment.replies.forEach((reply) => {
          reply.reactions = {};
          return reply;
        });
        return comment;
      })
    : initialState,
  reducers: {
    addComment: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("reduxState", JSON.stringify(state));
    },
    removeComment: (state, action) => {
      let commentIndex = state.findIndex(
        (comment) => comment.id === action.payload.id
      );
      if (commentIndex !== -1) {
        state.splice(commentIndex, 1);
      } else {
        commentIndex = state.findIndex((comment) =>
          comment.replies.some((reply) => reply.id === action.payload.id)
        );
        const replyIndex = state[commentIndex].replies.findIndex(
          (reply) => reply.id === action.payload.id
        );
        state[commentIndex].replies.splice(replyIndex, 1);
      }
      localStorage.setItem("reduxState", JSON.stringify(state));
    },
    updateComment: (state, action) => {
      let commentIndex = state.findIndex(
        (comment) => comment.id === action.payload.id
      );
      if (commentIndex !== -1) {
        state[commentIndex].content = action.payload.content;
      } else {
        commentIndex = state.findIndex((comment) =>
          comment.replies.some((reply) => reply.id === action.payload.id)
        );
        const replyIndex = state[commentIndex].replies.findIndex(
          (reply) => reply.id === action.payload.id
        );
        state[commentIndex].replies[replyIndex].content =
          action.payload.content;
      }
      localStorage.setItem("reduxState", JSON.stringify(state));
    },
    addReply: (state, action) => {
      const commentFound = state.find(
        (comment) =>
          comment.id === action.payload.id ||
          comment.replies.find((reply) => reply.id === action.payload.id)
      );
      commentFound.replies.push(action.payload.content);
      localStorage.setItem("reduxState", JSON.stringify(state));
    },
    leaveUserImprint: (state, action) => {
      state.forEach((comment) => {
        comment.replies.forEach((reply) => {
          if (reply.id === action.payload.id) {
            reply.reactions[action.payload.user] = 0;
          }
        });
        if (comment.id === action.payload.id) {
          comment.reactions[action.payload.user] = 0;
        }
      });
      localStorage.setItem("reduxState", JSON.stringify(state));
    },
    increaseScore: (state, action) => {
      state.forEach((comment) => {
        comment.replies.forEach((reply) => {
          if (reply.id === action.payload.id) {
            reply.score += 1;
            reply.reactions[action.payload.user] += 1;
          }
        });
        if (comment.id === action.payload.id) {
          comment.score += 1;
          comment.reactions[action.payload.user] += 1;
        }
      });
      localStorage.setItem("reduxState", JSON.stringify(state));
    },
    decreaseScore: (state, action) => {
      state.forEach((comment) => {
        comment.replies.forEach((reply) => {
          if (reply.id === action.payload.id) {
            reply.score -= 1;
            reply.reactions[action.payload.user] -= 1;
          }
        });
        if (comment.id === action.payload.id) {
          comment.score -= 1;
          comment.reactions[action.payload.user] -= 1;
        }
      });
      localStorage.setItem("reduxState", JSON.stringify(state));
    },
  },
});

export const selectComments = (state) => state.comments;

export default commentsSlice.reducer;

export const {
  addComment,
  removeComment,
  updateComment,
  addReply,
  increaseScore,
  decreaseScore,
  leaveUserImprint
} = commentsSlice.actions;
