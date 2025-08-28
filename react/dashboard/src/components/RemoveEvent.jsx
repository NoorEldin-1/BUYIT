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
import { removeEventProduct } from "../features/productSlice";

const RemoveEvent = () => {
  const open = useSelector((state) => state.dialog);
  const loading = useSelector(
    (state) => state.product.removeEventProductLoading
  );
  const productId = useSelector((state) => state.product.productId);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(changeDialog("no dialog"));
  }, [dispatch]);

  const handleRemoveEvent = useCallback(() => {
    dispatch(removeEventProduct(productId));
  }, [productId, dispatch]);

  return (
    <Dialog open={open === "removeEvent"} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: "center", textTransform: "uppercase" }}>
        remove event
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center" }}>
          Are you sure you want to remove this from events?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>cancel</Button>
        <Button
          onClick={handleRemoveEvent}
          color="error"
          disabled={loading}
          loading={loading}
        >
          remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveEvent;
