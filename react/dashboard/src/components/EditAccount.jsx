import { Box, Button, TextField, Typography } from "@mui/material";
import { DrawerHeader, Main } from "./Dashboard";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit } from "../features/authSlice";

const EditAccount = ({ open }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.editLoading);
  const error = useSelector((state) => state.auth.editErrorMsg);
  const [info, setInfo] = useState({
    fullName: window.localStorage.getItem("full_name"),
    username: window.localStorage.getItem("username"),
    password: "",
  });
  const [validation, setValidation] = useState({
    fullName: "primary",
    username: "primary",
    password: "primary",
  });

  const handleChange = useCallback((e) => {
    if (e.target.name === "fullName") {
      if (e.target.value.length <= 0 || e.target.value.length > 100) {
        setValidation((prev) => ({ ...prev, fullName: "error" }));
      } else {
        setValidation((prev) => ({ ...prev, fullName: "success" }));
      }
    }
    if (e.target.name === "username") {
      if (e.target.value.length <= 0 || e.target.value.length > 100) {
        setValidation((prev) => ({ ...prev, username: "error" }));
      } else {
        setValidation((prev) => ({ ...prev, username: "success" }));
      }
    }
    if (e.target.name === "password") {
      if (e.target.value.length < 8) {
        setValidation((prev) => ({ ...prev, password: "error" }));
      } else {
        setValidation((prev) => ({ ...prev, password: "success" }));
      }
    }
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleEditAccount = useCallback(() => {
    if (!info.fullName.trim() || !info.username.trim()) return;
    if (
      info.fullName === window.localStorage.getItem("full_name") &&
      info.username === window.localStorage.getItem("username") &&
      !info.password
    )
      return;
    if (
      validation.username === "error" ||
      validation.fullName === "error" ||
      validation.password === "error"
    )
      return;

    dispatch(edit(info));
  }, [
    dispatch,
    info,
    validation.fullName,
    validation.password,
    validation.username,
  ]);

  const fullNameElement = useMemo(() => {
    return (
      <TextField
        placeholder="full name"
        variant="outlined"
        type="text"
        label="full name"
        name="fullName"
        autoComplete="off"
        onChange={handleChange}
        value={info.fullName}
        helperText={"min: 1 && max: 100"}
        color={validation.fullName}
      />
    );
  }, [handleChange, info.fullName, validation.fullName]);
  const passwordElement = useMemo(() => {
    return (
      <TextField
        placeholder="password"
        variant="outlined"
        type="password"
        label="password"
        name="password"
        autoComplete="off"
        onChange={handleChange}
        value={info.password}
        helperText={"min: 8"}
        color={validation.password}
      />
    );
  }, [handleChange, info.password, validation.password]);
  const usernameElement = useMemo(() => {
    return (
      <TextField
        placeholder="username"
        variant="outlined"
        type="text"
        label="username"
        name="username"
        autoComplete="off"
        onChange={handleChange}
        value={info.username}
        helperText={"min: 1 && max: 100"}
        color={validation.username}
      />
    );
  }, [handleChange, info.username, validation.username]);

  const element = useMemo(() => {
    return (
      <Main
        open={open}
        sx={{
          display: "grid",
          placeContent: "center",
          height: "100vh",
          overflowX: "hidden",
        }}
      >
        <DrawerHeader />
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
            edit account
          </Typography>

          {error ? (
            <Typography
              align="center"
              textTransform={"capitalize"}
              sx={{ color: "red", fontWeight: "bold" }}
            >
              {error}.
            </Typography>
          ) : (
            <Typography
              align="center"
              textTransform={"capitalize"}
              sx={{ opacity: 0.5 }}
            >
              enter your new credentials.
            </Typography>
          )}

          {fullNameElement}
          {usernameElement}
          {passwordElement}

          <Button
            variant="contained"
            size="large"
            onClick={handleEditAccount}
            disabled={loading}
            loading={loading}
          >
            edit account
          </Button>
        </Box>
      </Main>
    );
  }, [
    error,
    fullNameElement,
    handleEditAccount,
    loading,
    open,
    passwordElement,
    usernameElement,
  ]);

  return element;
};

export default EditAccount;
