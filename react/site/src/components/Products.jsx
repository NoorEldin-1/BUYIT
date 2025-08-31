import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Mousewheel, Pagination } from "swiper/modules";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { setProductId } from "../store/productSlice";
import { changeDialog } from "../store/dialogSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { addToCart } from "../store/cartSlice";
import { setSaveId } from "../store/savesSlice";
import { useTheme } from "@mui/material";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.landing.products);
  const navigate = useNavigate();
  const theme = useTheme();

  const swiperElement = useCallback(
    (product) => {
      return (
        <SwiperSlide
          key={product.id}
          style={{
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
              src={product.image}
              alt={product.name}
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
                {product.name.length > 25
                  ? product.name.slice(0, 25) + "..."
                  : product.name}
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
                {product.info}
              </Typography>
              <Typography
                variant="h6"
                fontWeight={700}
                color="primary"
                sx={{ mb: 2 }}
              >
                {product.price} EGP
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
                size="small"
                variant="outlined"
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
        </SwiperSlide>
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

  const landingProductElement = useCallback(
    (product) => {
      return (
        <div key={product.id}>
          <Box p={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                color="primary"
                variant="outlined"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate(`/category/${product.id}`)}
                sx={{ my: 2 }}
              >
                {product?.name}
              </Button>
            </Box>
            <Swiper
              style={{ width: "95%", paddingBottom: "25px" }}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              initialSlide={2}
              mousewheel={true}
              coverflowEffect={{
                rotate: 20,
                stretch: 50,
                depth: 150,
                modifier: 1,
                slideShadows: true,
                scale: 0.8,
              }}
              modules={[EffectCoverflow, Mousewheel, Pagination]}
              className="mySwiper"
            >
              {product.products.map((product) => swiperElement(product))}
            </Swiper>
          </Box>
          <Divider
            sx={{
              backgroundColor: "primary.main",
              height: "2px",
              width: "50%",
              mx: "auto",
            }}
          />
        </div>
      );
    },
    [navigate, swiperElement]
  );

  const element = useMemo(() => {
    return (
      <>
        {products.map((product) => {
          if (product.products.length > 0) {
            return landingProductElement(product);
          }
        })}
      </>
    );
  }, [landingProductElement, products]);

  return element;
};

export default Products;
