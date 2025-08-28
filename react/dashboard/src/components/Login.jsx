import { Box, Button, TextField, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loginLoading);
  const error = useSelector((state) => state.auth.loginErrorMsg);
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });

  const handleLogin = useCallback(() => {
    if (!info.username || !info.password) return;

    dispatch(login(info));
  }, [dispatch, info]);

  const handleChange = useCallback((e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const formElement = useMemo(() => {
    return (
      <>
        <TextField
          placeholder="username"
          variant="outlined"
          type="text"
          label="username"
          onChange={handleChange}
          name="username"
          autoComplete="off"
        />
        <TextField
          placeholder="password"
          variant="outlined"
          type="password"
          label="password"
          onChange={handleChange}
          name="password"
          autoComplete="off"
        />
      </>
    );
  }, [handleChange]);

  const element = useMemo(() => {
    return (
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            display: "flex",
            flexDirection: "column",
            width: { xs: "300px", sm: "400px" },
            gap: "20px",
            boxShadow: "0px 0 20px 5px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            textTransform={"uppercase"}
            fontWeight={"bold"}
          >
            login
          </Typography>

          {error ? (
            <Typography
              align="center"
              textTransform={"capitalize"}
              color="red"
              fontWeight={"bold"}
            >
              credentials error.
            </Typography>
          ) : (
            <Typography
              align="center"
              textTransform={"capitalize"}
              sx={{ opacity: 0.5 }}
            >
              enter your credentials.
            </Typography>
          )}

          {formElement}

          <Button
            variant="contained"
            size="large"
            onClick={handleLogin}
            disabled={loading}
            loading={loading}
          >
            login
          </Button>
        </Box>
      </Box>
    );
  }, [error, formElement, handleLogin, loading]);

  return element;
};

export default Login;
