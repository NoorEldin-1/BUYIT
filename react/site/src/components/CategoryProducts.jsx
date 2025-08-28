import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryProducts,
  getSearchCategoryProducts,
} from "../store/categoriesSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { setProductId } from "../store/productSlice";
import { changeDialog } from "../store/dialogSlice";

const CategoryProducts = () => {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.categories.categoryProducts);
  const loading = useSelector(
    (state) => state.categories.getCategoryProductsLoading
  );
  const [allProducts, setAllProducts] = useState(
    <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
      no products found
    </Typography>
  );

  useEffect(() => {
    dispatch(getCategoryProducts(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (products.length > 0) {
      setAllProducts(
        products.map((product) => {
          return (
            <Box
              sx={{
                width: "250px",
                maxHeight: "350px",
                userSelect: "none",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
                overflow: "hidden",
                border: `1px solid ${theme.palette.primary.main}`,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
              key={product?.id}
            >
              <img
                src={product?.image}
                style={{ width: "100%", height: "100px", objectFit: "cover" }}
              />
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="body2" fontWeight={"bold"}>
                  {product?.name.length > 15
                    ? product?.name.slice(0, 15) + "..."
                    : product?.name}
                </Typography>
                <Typography variant="caption">
                  {product?.info.length > 25
                    ? product?.info.slice(0, 25) + "..."
                    : product?.info}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={"bold"}
                  color="primary"
                  align="right"
                >
                  {product?.price}EGP
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddShoppingCartIcon />}
                  >
                    buyit
                  </Button>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      !window.localStorage.getItem("token") &&
                        dispatch(changeDialog("login"));
                    }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      dispatch(setProductId(product.id));
                      dispatch(changeDialog("product"));
                    }}
                  >
                    details
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })
      );
    } else {
      setAllProducts(
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          no products found
        </Typography>
      );
    }
  }, [dispatch, products, theme.palette.primary.main]);

  let handleTimeout = useRef();
  const handleSearch = useCallback(
    (search) => {
      clearTimeout(handleTimeout.current);
      handleTimeout.current = setTimeout(() => {
        dispatch(getSearchCategoryProducts({ id, search }));
      }, 500);
    },
    [dispatch, id]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflow: "hidden",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box sx={{ display: "flex" }}>
        <TextField
          type="text"
          variant="outlined"
          label={"search"}
          placeholder="type..."
          size="small"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </Box>
      {products[0]?.category?.name && (
        <Typography color="primary" fontWeight={"bold"} variant="body1">
          {`( ${products[0]?.category?.name} )`}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          overflow: "hidden",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <CircularProgress
            size={20}
            color="primary"
            sx={{ display: "flex", mx: "auto", my: 2 }}
          />
        ) : (
          allProducts
        )}
      </Box>
    </Box>
  );
};

export default CategoryProducts;
