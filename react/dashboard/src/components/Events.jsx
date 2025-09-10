import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { DrawerHeader, Main } from "./Dashboard";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDialog } from "../features/dialogSlice";
import { useNavigate } from "react-router";
import { Accordion, AccordionDetails, AccordionSummary } from "./Dashboard";
import { getAllEvents, setProductId } from "../features/productSlice";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import CategoryIcon from "@mui/icons-material/Category";

const Events = ({ open }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rows = useSelector((state) => state.product.events);
  const loading = useSelector((state) => state.product.getAllEventsLoading);
  const [events, setEvents] = useState(
    <Typography
      variant="h6"
      fontWeight={"bold"}
      textTransform={"uppercase"}
      align="center"
    >
      no events found
    </Typography>
  );

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const singleRow = useCallback(
    (row) => {
      return (
        <Accordion key={row.id}>
          <AccordionSummary>
            <Typography component="span">{row.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              fontWeight="bold"
              textTransform={"uppercase"}
              display={"inline"}
            >
              category name:{" "}
            </Typography>
            {row.category.name}
            <br />
            <Typography
              variant="body2"
              fontWeight="bold"
              textTransform={"uppercase"}
              display={"inline"}
            >
              product name:{" "}
            </Typography>
            {row.name}
            <br />
            <Typography
              variant="body2"
              fontWeight="bold"
              textTransform={"uppercase"}
              display={"inline"}
            >
              product info:{" "}
            </Typography>
            {row.info}
            <br />
            <Typography
              variant="body2"
              fontWeight="bold"
              textTransform={"uppercase"}
              display={"inline"}
            >
              product price:{" "}
            </Typography>
            {row.price}
            <br />
            <img
              src={row.image}
              alt=""
              style={{ width: "80px", height: "80px" }}
            />
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
                color="primary"
                onClick={() => navigate(`/edit-product/${row.id}`)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  dispatch(setProductId(row.id));
                  dispatch(changeDialog("deleteProduct"));
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  dispatch(setProductId(row.id));
                  dispatch(changeDialog("removeEvent"));
                }}
              >
                <EventBusyIcon />
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => navigate(`/category/${row.category.id}`)}
              >
                <CategoryIcon />
              </IconButton>
            </Box>
          </AccordionDetails>
        </Accordion>
      );
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    if (rows.length > 0) {
      setEvents(<div>{rows.map((row) => singleRow(row))}</div>);
    } else {
      setEvents(
        <Typography
          variant="h6"
          fontWeight={"bold"}
          textTransform={"uppercase"}
          align="center"
        >
          no events found
        </Typography>
      );
    }
  }, [rows, singleRow]);

  const element = useMemo(() => {
    return (
      <Main open={open} sx={{ overflow: "hidden" }}>
        <DrawerHeader />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            textTransform={"uppercase"}
          >
            events
          </Typography>
          {loading ? (
            <CircularProgress
              sx={{
                display: "flex",
                mx: "auto",
              }}
            />
          ) : (
            events
          )}
        </Box>
      </Main>
    );
  }, [events, loading, open]);

  return element;
};

export default Events;
