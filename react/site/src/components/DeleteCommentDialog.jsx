import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";

const DeleteCommentDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} scroll={"paper"}>
      <DialogTitle sx={{ textTransform: "uppercase" }}>
        delete comment
      </DialogTitle>
      <Divider sx={{ backgroundColor: "primary.main" }} />
      <DialogContent dividers={scroll === "paper"}>
        <DialogContentText>
          <Typography variant="body1" textTransform={"capitalize"}>
            are you sure you want to delete this comment?
          </Typography>
        </DialogContentText>
      </DialogContent>
      <Divider sx={{ backgroundColor: "primary.main" }} />
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          cancel
        </Button>
        <Button onClick={handleClose} variant="contained">
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCommentDialog;
