import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeDialog } from "../features/dialogSlice";
import { useCallback, useMemo, useState } from "react";
import { editCategory } from "../features/categorySlice";
const EditCategory = () => {
  const open = useSelector((state) => state.dialog);
  const loading = useSelector((state) => state.category.editCategoryLoading);
  const categoryInfo = useSelector((state) => state.category.categoryInfo);
  const [name, setName] = useState(categoryInfo.name);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(changeDialog("no dialog"));
  }, [dispatch]);

  const handleEditCategory = useCallback(() => {
    if (!name.trim() || name.trim().length > 100) return;
    const info = {
      id: categoryInfo.id,
      name: name,
    };
    dispatch(editCategory(info));
  }, [categoryInfo.id, dispatch, name]);

  const categoryNameElement = useMemo(() => {
    return (
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="new category name"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
      />
    );
  }, [name]);

  const element = useMemo(() => {
    return (
      <Dialog open={open === "editCategory"} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: "center", textTransform: "uppercase" }}>
          edit category
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }}>
            enter new category name and click edit, if you want to discard click
            cancel.
          </DialogContentText>
          {categoryNameElement}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button
            onClick={handleEditCategory}
            color="success"
            disabled={loading}
            loading={loading}
          >
            edit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }, [categoryNameElement, handleClose, handleEditCategory, loading, open]);

  return element;
};

export default EditCategory;
