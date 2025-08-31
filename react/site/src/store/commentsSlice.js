import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../main";
import { changeDialog } from "./dialogSlice";

export const getAllComments = createAsyncThunk(
  "getAllComments",
  async (product_id) => {
    const res = await axios.get(
      `${backendUrl}comment/all/product/${product_id}`
    );
    return res.data;
  }
);

export const createComment = createAsyncThunk(
  "createComment",
  async ({ product_id, comment }) => {
    const res = await axios.post(
      `${backendUrl}comment/create`,
      {
        product_id: product_id,
        comment: comment,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  }
);

export const deleteComment = createAsyncThunk(
  "deleteComment",
  async ({ product_id, comment_id }, { dispatch }) => {
    const res = await axios.delete(
      `${backendUrl}comment/delete/${product_id}/${comment_id}`,
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(changeDialog("no dialog"));
    return res.data;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    commentId: null,
    getAllCommentsLoading: false,
    createCommentLoading: false,
    deleteCommentLoading: false,
  },
  reducers: {
    setCommentId: (state, action) => {
      state.commentId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllComments.pending, (state) => {
        state.getAllCommentsLoading = true;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.getAllCommentsLoading = false;
        state.comments = action.payload.comments;
      })
      .addCase(createComment.pending, (state) => {
        state.createCommentLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.createCommentLoading = false;
        state.comments.unshift(action.payload.comment);
      })
      .addCase(deleteComment.pending, (state) => {
        state.deleteCommentLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.deleteCommentLoading = false;
        state.comments = state.comments.filter(
          (comment) => comment.id !== state.commentId
        );
      });
  },
});

export const { setCommentId } = commentsSlice.actions;
export default commentsSlice.reducer;
