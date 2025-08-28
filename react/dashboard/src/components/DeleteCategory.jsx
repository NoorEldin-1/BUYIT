import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeDialog } from "../features/dialogSlice";
import { useCallback } from "react";
import { deleteCategory } from "../features/categorySlice";

const DeleteCategory = () => {
  const open = useSelector((state) => state.dialog);
  const loading = useSelector((state) => state.category.deleteCategoryLoading);
  const categoryInfo = useSelector((state) => state.category.categoryInfo);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(changeDialog("no dialog"));
  }, [dispatch]);

  const handleDeleteCategory = useCallback(() => {
    dispatch(deleteCategory(categoryInfo.id));
  }, [categoryInfo, dispatch]);
  return (
    <Dialog open={open === "deleteCategory"} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: "center", textTransform: "uppercase" }}>
        delete category
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center" }}>
          Are you sure you want to delete this category?, this action is
          irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>cancel</Button>
        <Button
          onClick={handleDeleteCategory}
          color="error"
          disabled={loading}
          loading={loading}
        >
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCategory;
