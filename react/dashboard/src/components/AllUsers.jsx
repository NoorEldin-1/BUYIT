import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, setUserInfo } from "../features/userSlice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import { DrawerHeader, Main } from "./Dashboard";
import { Accordion, AccordionDetails, AccordionSummary } from "./Dashboard";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { changeDialog } from "../features/dialogSlice";

const AllUsers = ({ open }) => {
  const dispatch = useDispatch();
  const getAllUsersLoading = useSelector(
    (state) => state.user.getAllUsersLoading
  );
  const allUsers = useSelector((state) => state.user.users);
  const [users, setUsers] = useState(
    <Typography
      variant="h6"
      fontWeight={"bold"}
      textTransform={"uppercase"}
      align="center"
    >
      no users found
    </Typography>
  );
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const singleRow = useCallback(
    (row) => {
      return (
        <Accordion key={row.id}>
          <AccordionSummary>
            <Typography component="span">{row.full_name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              fontWeight="bold"
              textTransform={"uppercase"}
              display={"inline"}
            >
              full name:{" "}
            </Typography>
            {row.full_name}
            <br />
            <Typography
              variant="body2"
              fontWeight="bold"
              textTransform={"uppercase"}
              display={"inline"}
            >
              email:{" "}
            </Typography>
            {row.email}
            <br />
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconButton
                color="error"
                onClick={() => {
                  dispatch(setUserInfo(row));
                  dispatch(changeDialog("deleteUser"));
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </AccordionDetails>
        </Accordion>
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (allUsers.length > 0) {
      setUsers(<div>{allUsers.map((row) => singleRow(row))}</div>);
    } else {
      setUsers(
        <Typography
          variant="h6"
          fontWeight={"bold"}
          textTransform={"uppercase"}
          align="center"
        >
          no users found
        </Typography>
      );
    }
  }, [allUsers, singleRow]);

  const element = useMemo(() => {
    return (
      <Main open={open} sx={{ overflow: "hidden" }}>
        <DrawerHeader />
        {getAllUsersLoading ? (
          <CircularProgress
            sx={{
              display: "flex",
              mx: "auto",
            }}
          />
        ) : (
          users
        )}
      </Main>
    );
  }, [getAllUsersLoading, open, users]);

  return element;
};

export default AllUsers;
