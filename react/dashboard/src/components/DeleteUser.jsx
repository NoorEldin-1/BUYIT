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
import { deleteUser } from "../features/userSlice";

const DeleteUser = () => {
  const open = useSelector((state) => state.dialog);
  const loading = useSelector((state) => state.user.deleteUserLoading);
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(changeDialog("no dialog"));
  }, [dispatch]);

  const handleDeleteUser = useCallback(() => {
    dispatch(deleteUser(userInfo.id));
  }, [userInfo, dispatch]);

  const element = useMemo(() => {
    return (
      <Dialog open={open === "deleteUser"} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: "center", textTransform: "uppercase" }}>
          delete user
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }}>
            Are you sure you want to delete this user?, this action is
            irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button
            onClick={handleDeleteUser}
            color="error"
            disabled={loading}
            loading={loading}
          >
            delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }, [handleClose, handleDeleteUser, loading, open]);

  return element;
};

export default DeleteUser;
