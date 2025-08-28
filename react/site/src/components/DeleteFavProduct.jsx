import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
const DeleteFavProduct = ({ open, handleClose }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>delete favorite product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          are you sure you want to delete this product from your favorite list?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error">
          delete
        </Button>
        <Button onClick={handleClose} variant="outlined">
          cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteFavProduct;
