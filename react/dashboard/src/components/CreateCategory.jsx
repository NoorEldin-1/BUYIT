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
import { createCategory } from "../features/categorySlice";

const CreateCategory = () => {
  const open = useSelector((state) => state.dialog);
  const loading = useSelector((state) => state.category.createCategoryLoading);
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(changeDialog("no dialog"));
  }, [dispatch]);

  const handleCreateCategory = useCallback(() => {
    if (!name.trim() || name.trim().length > 100) return;
    dispatch(createCategory(name));
  }, [dispatch, name]);

  const categoryNameElement = useMemo(() => {
    return (
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="category name"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
      />
    );
  }, [name]);

  const element = useMemo(() => {
    return (
      <Dialog open={open === "createCategory"} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: "center", textTransform: "uppercase" }}>
          create category
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }}>
            enter category name and click create, if you want to discard click
            cancel.
          </DialogContentText>
          {categoryNameElement}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button
            onClick={handleCreateCategory}
            color="success"
            disabled={loading}
            loading={loading}
          >
            create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }, [categoryNameElement, handleClose, handleCreateCategory, loading, open]);

  return element;
};

export default CreateCategory;
