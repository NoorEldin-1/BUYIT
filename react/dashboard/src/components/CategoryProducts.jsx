import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductId, showCategoryProducts } from "../features/productSlice";
import {
  Box,
  CircularProgress,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import { DrawerHeader, Main } from "./Dashboard";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router";
import { changeDialog } from "../features/dialogSlice";
import { Accordion, AccordionDetails, AccordionSummary } from "../App";
import EventIcon from "@mui/icons-material/Event";
import EventBusyIcon from "@mui/icons-material/EventBusy";

const CategoryProducts = ({ open }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const rows = useSelector((state) => state.product.categoryProducts);
  const loading = useSelector(
    (state) => state.product.showCategoryProductsLoading
  );
  const [products, setProducts] = useState(
    <Typography
      variant="h6"
      fontWeight={"bold"}
      textTransform={"uppercase"}
      align="center"
    >
      no products found
    </Typography>
  );

  useEffect(() => {
    dispatch(showCategoryProducts(id));
  }, [dispatch, id]);

  const singleRow = useCallback(
    (row) => {
      return (
        <Accordion key={row.id}>
          <AccordionSummary>
            <Typography component="span">
              {row.name} #{row.id}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ wordBreak: "break-word" }}>
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
              alt="product image"
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
              {row.is_event === "no" ? (
                <IconButton
                  color="success"
                  onClick={() => {
                    dispatch(setProductId(row.id));
                    dispatch(changeDialog("addEvent"));
                  }}
                >
                  <EventIcon />
                </IconButton>
              ) : (
                <IconButton
                  color="error"
                  onClick={() => {
                    dispatch(setProductId(row.id));
                    dispatch(changeDialog("removeEvent"));
                  }}
                >
                  <EventBusyIcon />
                </IconButton>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      );
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    if (rows.length > 0) {
      setProducts(<div>{rows.map((row) => singleRow(row))}</div>);
    } else {
      setProducts(
        <Typography
          variant="h6"
          fontWeight={"bold"}
          textTransform={"uppercase"}
          align="center"
        >
          no products found
        </Typography>
      );
    }
  }, [dispatch, navigate, rows, singleRow, theme.palette.background.default]);

  return (
    <Main open={open} sx={{ overflow: "hidden" }}>
      <DrawerHeader />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography
          variant="h6"
          fontWeight={"bold"}
          textTransform={"uppercase"}
        >
          category products
        </Typography>
        {loading ? (
          <CircularProgress
            sx={{
              display: "flex",
              mx: "auto",
            }}
          />
        ) : (
          products
        )}
      </Box>
    </Main>
  );
};

export default CategoryProducts;
