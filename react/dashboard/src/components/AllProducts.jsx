import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNextProducts,
  getAllProducts,
  setProductId,
} from "../features/productSlice";
import {
  Box,
  CircularProgress,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { DrawerHeader, Main } from "./Dashboard";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { changeDialog } from "../features/dialogSlice";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import { Accordion, AccordionDetails, AccordionSummary } from "./Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import EventIcon from "@mui/icons-material/Event";
import EventBusyIcon from "@mui/icons-material/EventBusy";

const AllProducts = ({ open }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rows = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.getAllProductsLoading);
  const nextProductsLink = useSelector(
    (state) => state.product.nextProductsLink
  );
  const getNextProductsLoading = useSelector(
    (state) => state.product.nextProductsLoading
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
    dispatch(getAllProducts());
  }, [dispatch]);

  const singleRow = useCallback(
    (row) => {
      return (
        <Accordion key={row.id}>
          <AccordionSummary>
            <Typography component="span">{row.name}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ wordBreak: "break-word" }}>
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
            products
          </Typography>
          {loading ? (
            <CircularProgress
              sx={{
                display: "flex",
                mx: "auto",
              }}
            />
          ) : (
            <>
              {products}
              <Button
                variant="outlined"
                sx={{ width: "fit-content", ml: "auto" }}
                startIcon={<MoreTimeIcon />}
                disabled={getNextProductsLoading || nextProductsLink === null}
                loading={getNextProductsLoading}
                onClick={() => dispatch(getAllNextProducts(nextProductsLink))}
              >
                show more
              </Button>
            </>
          )}
        </Box>
      </Main>
    );
  }, [
    dispatch,
    getNextProductsLoading,
    loading,
    nextProductsLink,
    open,
    products,
  ]);

  return element;
};

export default AllProducts;
