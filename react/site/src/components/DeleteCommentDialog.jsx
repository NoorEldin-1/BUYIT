import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDialog } from "../store/dialogSlice";
import { deleteComment } from "../store/commentsSlice";

const DeleteCommentDialog = () => {
  const dispatch = useDispatch();
  const commentId = useSelector((state) => state.comments.commentId);
  const productId = useSelector((state) => state.product.productId);
  const deleteCommentLoading = useSelector(
    (state) => state.comments.deleteCommentLoading
  );
  const dialog = useSelector((state) => state.dialog);

  const handleDeleteComment = useCallback(() => {
    dispatch(deleteComment({ product_id: productId, comment_id: commentId }));
  }, [commentId, dispatch, productId]);

  const element = useMemo(() => {
    return (
      <Dialog open={dialog === "deleteComment"} scroll={"paper"}>
        <DialogTitle sx={{ textTransform: "uppercase" }}>
          delete comment
        </DialogTitle>
        <Divider sx={{ backgroundColor: "primary.main" }} />
        <DialogContent dividers={scroll === "paper"}>
          <Typography variant="body1" textTransform={"capitalize"}>
            are you sure you want to delete this comment?
          </Typography>
        </DialogContent>
        <Divider sx={{ backgroundColor: "primary.main" }} />
        <DialogActions>
          {deleteCommentLoading ? (
            <CircularProgress size={20} color="primary" />
          ) : (
            <>
              <Button
                onClick={() => dispatch(changeDialog("no dialog"))}
                variant="outlined"
              >
                cancel
              </Button>
              <Button onClick={handleDeleteComment} variant="contained">
                delete
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  }, [deleteCommentLoading, dialog, dispatch, handleDeleteComment]);

  return element;
};

export default DeleteCommentDialog;
