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
import { logout } from "../features/authSlice";

const Logout = () => {
  const open = useSelector((state) => state.dialog);
  const loading = useSelector((state) => state.auth.logoutLoading);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(changeDialog("no dialog"));
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const element = useMemo(() => {
    return (
      <Dialog open={open === "logout"} fullWidth maxWidth="xs">
        <DialogTitle sx={{ textAlign: "center", textTransform: "uppercase" }}>
          logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }}>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button
            onClick={handleLogout}
            color="error"
            disabled={loading}
            loading={loading}
          >
            logout
          </Button>
        </DialogActions>
      </Dialog>
    );
  }, [handleClose, handleLogout, loading, open]);

  return element;
};

export default Logout;
