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
import { deleteProduct } from "../features/productSlice";

const DeleteProduct = () => {
  const open = useSelector((state) => state.dialog);
  const loading = useSelector((state) => state.product.deleteProductLoading);
  const productId = useSelector((state) => state.product.productId);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(changeDialog("no dialog"));
  }, [dispatch]);

  const handleDeleteProduct = useCallback(() => {
    dispatch(deleteProduct(productId));
  }, [dispatch, productId]);

  const element = useMemo(() => {
    return (
      <Dialog open={open === "deleteProduct"} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: "center", textTransform: "uppercase" }}>
          delete product
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }}>
            Are you sure you want to delete this product?, this action is
            irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button
            onClick={handleDeleteProduct}
            color="error"
            disabled={loading}
            loading={loading}
          >
            delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }, [handleClose, handleDeleteProduct, loading, open]);

  return element;
};

export default DeleteProduct;
