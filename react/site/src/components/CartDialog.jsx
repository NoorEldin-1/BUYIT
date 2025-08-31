import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { changeDialog } from "../store/dialogSlice";
import { buyitOperation, removeFromCart } from "../store/cartSlice";
import { useCallback, useMemo } from "react";
import { setProductId } from "../store/productSlice";
import { setSaveId } from "../store/savesSlice";

const CartDialog = () => {
  const dialog = useSelector((state) => state.dialog);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const productElement = useCallback(
    (product) => {
      return (
        <Box
          key={product.id}
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setProductId(product.id));
            dispatch(setSaveId(product.id));
            dispatch(changeDialog("product"));
          }}
        >
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <img
              src={product.image}
              alt=""
              style={{
                width: "40px",
                height: "40px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography fontWeight={"bold"} variant="body2">
                {product.name}
              </Typography>
              <Typography variant="caption" fontWeight={"bold"} color="primary">
                {product.price}EGP
              </Typography>
            </Box>
          </Box>
          <IconButton
            color="error"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(removeFromCart(product));
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      );
    },
    [dispatch]
  );

  const element = useMemo(() => {
    return (
      <Dialog open={dialog === "cart"} scroll={"paper"} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textTransform: "uppercase" }}>
          cart details
        </DialogTitle>
        <Divider sx={{ backgroundColor: "primary.main" }} />
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {cart.length === 0 ? (
                <Typography
                  variant="body2"
                  textTransform={"capitalize"}
                  fontWeight={"bold"}
                  align="center"
                >
                  No products in cart
                </Typography>
              ) : (
                cart.map((product) => {
                  return productElement(product);
                })
              )}
            </Box>
          </DialogContentText>
        </DialogContent>
        <Divider sx={{ backgroundColor: "primary.main" }} />
        <DialogActions>
          <Button
            variant="contained"
            startIcon={<WhatsAppIcon />}
            onClick={() => dispatch(buyitOperation())}
            disabled={cart.length === 0}
          >
            buyit
          </Button>
          <Button
            onClick={() => dispatch(changeDialog("no dialog"))}
            variant="outlined"
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }, [cart, dialog, dispatch, productElement]);

  return element;
};

export default CartDialog;
