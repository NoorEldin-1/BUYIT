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
import { addEventProduct } from "../features/productSlice";

const AddEvent = () => {
  const open = useSelector((state) => state.dialog);
  const loading = useSelector((state) => state.product.addEventProductLoading);
  const productId = useSelector((state) => state.product.productId);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(changeDialog("no dialog"));
  }, [dispatch]);

  const handleAddEvent = useCallback(() => {
    dispatch(addEventProduct(productId));
  }, [productId, dispatch]);

  const element = useMemo(() => {
    return (
      <Dialog open={open === "addEvent"} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: "center", textTransform: "uppercase" }}>
          add event
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }}>
            Are you sure you want to add this to events?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button
            onClick={handleAddEvent}
            color="success"
            disabled={loading}
            loading={loading}
          >
            add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }, [handleAddEvent, handleClose, loading, open]);

  return element;
};

export default AddEvent;
