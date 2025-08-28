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

const CartDialog = () => {
  const count = Array.from({ length: 10 });
  const dialog = useSelector((state) => state.dialog);
  const dispatch = useDispatch();
  return (
    <Dialog open={dialog === "cart"} scroll={"paper"} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textTransform: "uppercase" }}>
        cart details
      </DialogTitle>
      <Divider sx={{ backgroundColor: "primary.main" }} />
      <DialogContent dividers={scroll === "paper"}>
        <DialogContentText>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {count.map((_, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <img
                      src="https://swiperjs.com/demos/images/nature-3.jpg"
                      alt=""
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Typography fontWeight={"bold"} variant="body2">
                        product title
                      </Typography>
                      <Typography
                        variant="caption"
                        fontWeight={"bold"}
                        color="primary"
                      >
                        1200EGP
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              );
            })}
          </Box>
        </DialogContentText>
      </DialogContent>
      <Divider sx={{ backgroundColor: "primary.main" }} />
      <DialogActions>
        <Button
          onClick={() => dispatch(changeDialog("no dialog"))}
          variant="contained"
          startIcon={<WhatsAppIcon />}
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
};

export default CartDialog;
