import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch } from "react-redux";
import { changeDialog } from "../store/dialogSlice";
import { useSelector } from "react-redux";
import { login } from "../store/authSlice";

const LoginAlertDialog = () => {
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.dialog);
  return (
    <Dialog open={dialog === "login"} maxWidth="xs" fullWidth>
      <DialogTitle textTransform={"uppercase"}>google signin</DialogTitle>
      <DialogContent>
        <DialogContentText align="center" textTransform={"capitalize"}>
          you need to signin to access this feature.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => dispatch(login())}
          startIcon={<GoogleIcon />}
          variant="contained"
          size="small"
        >
          signin with google
        </Button>
        <Button
          onClick={() => dispatch(changeDialog("no dialog"))}
          variant="outlined"
          size="small"
        >
          cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default LoginAlertDialog;
