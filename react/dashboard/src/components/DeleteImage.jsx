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
import { useCallback, useMemo } from "react";
import { deleteProductImage } from "../features/productSlice";

const DeleteImage = () => {
  const open = useSelector((state) => state.dialog);
  const loading = useSelector(
    (state) => state.product.deleteProductImageLoading
  );
  const imageId = useSelector((state) => state.product.imageId);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(changeDialog("no dialog"));
  }, [dispatch]);

  const handleDeleteImage = useCallback(() => {
    dispatch(deleteProductImage(imageId));
  }, [imageId, dispatch]);

  const element = useMemo(() => {
    return (
      <Dialog open={open === "deleteImage"} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: "center", textTransform: "uppercase" }}>
          delete image
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }}>
            Are you sure you want to delete this image?, this action is
            irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button
            onClick={handleDeleteImage}
            color="error"
            disabled={loading}
            loading={loading}
          >
            delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }, [handleClose, handleDeleteImage, loading, open]);

  return element;
};

export default DeleteImage;
