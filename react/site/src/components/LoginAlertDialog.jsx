import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch } from "react-redux";
import { changeDialog } from "../store/dialogSlice";
import { useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useMemo } from "react";

const LoginAlertDialog = () => {
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.dialog);
  const loading = useSelector((state) => state.auth.loginLoading);

  const element = useMemo(() => {
    return (
      <Dialog open={dialog === "login"} maxWidth="xs" fullWidth>
        <DialogTitle textTransform={"uppercase"}>google signin</DialogTitle>
        <DialogContent>
          <Typography
            variant="body2"
            align="center"
            textTransform={"capitalize"}
          >
            you need to signin to access this feature.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => dispatch(login())}
            startIcon={<GoogleIcon />}
            variant="contained"
            size="small"
            disabled={loading}
            loading={loading}
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
  }, [dialog, dispatch, loading]);

  return element;
};
export default LoginAlertDialog;
