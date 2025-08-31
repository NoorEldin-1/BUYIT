import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryProducts,
  getSearchCategoryProducts,
} from "../store/categoriesSlice";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { setProductId } from "../store/productSlice";
import { changeDialog } from "../store/dialogSlice";
import { addToCart } from "../store/cartSlice";
import { setSaveId } from "../store/savesSlice";

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

  const productElement = useCallback(
    (product) => {
      return (
        <Box
          sx={{
            width: "280px",
            height: "380px",
            userSelect: "none",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            borderRadius: "12px",
            overflow: "hidden",
            border: `1px solid ${theme.palette.grey[200]}`,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
            },
          }}
          key={product?.id}
        >
          <Box
            sx={{
              width: "100%",
              height: "160px",
              backgroundColor: theme.palette.grey[50],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
              position: "relative",
            }}
          >
            <img
              src={product?.image}
              alt={product?.name}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
          </Box>
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              gap: 1.5,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{
                  mb: 0.5,
                  color: theme.palette.text.primary,
                  lineHeight: 1.3,
                }}
              >
                {product?.name.length > 25
                  ? product?.name.slice(0, 25) + "..."
                  : product?.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  mb: 1.5,
                  minHeight: "40px",
                }}
              >
                {product?.info}
              </Typography>
              <Typography
                variant="h6"
                fontWeight={700}
                color="primary"
                sx={{ mb: 2 }}
              >
                {product?.price} EGP
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                "& .MuiButton-root": {
                  flex: 1,
                  py: 1,
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 600,
                  letterSpacing: "0.3px",
                },
              }}
            >
              <Button
                variant="contained"
                size="small"
                startIcon={<AddShoppingCartIcon />}
                onClick={() => dispatch(addToCart(product))}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                    transform: "translateY(-1px)",
                  },
                }}
              >
                BUYIT
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  dispatch(setProductId(product.id));
                  dispatch(setSaveId(product.id));
                  dispatch(changeDialog("product"));
                }}
                sx={{
                  borderColor: theme.palette.grey[300],
                  color: theme.palette.text.primary,
                  "&:hover": {
                    borderColor: theme.palette.grey[400],
                    backgroundColor: theme.palette.action.hover,
                    transform: "translateY(-1px)",
                  },
                }}
              >
                DETAILS
              </Button>
            </Box>
          </Box>
        </Box>
      );
    },
    [
      dispatch,
      theme.palette.action.hover,
      theme.palette.grey,
      theme.palette.primary.dark,
      theme.palette.primary.main,
      theme.palette.text.primary,
    ]
  );

  useEffect(() => {
    if (products.length > 0) {
      setAllProducts(
        products.map((product) => {
          return productElement(product);
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
  }, [dispatch, productElement, products, theme.palette.primary.main]);

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

  const searchProductElement = useMemo(() => {
    return (
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
    );
  }, [handleSearch]);

  const element = useMemo(() => {
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
        {searchProductElement}
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
  }, [allProducts, loading, products, searchProductElement]);

  return element;
};

export default CategoryProducts;
