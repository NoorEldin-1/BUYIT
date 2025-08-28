// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow } from "swiper/modules";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../store/landingSlice";
import { setProductId } from "../store/productSlice";
import { changeDialog } from "../store/dialogSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.landing.products);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      {products.map((product) => {
        if (product.products.length > 0) {
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
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={"auto"}
                  initialSlide={2}
                  coverflowEffect={{
                    rotate: 20,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                    scale: 0.9,
                  }}
                  modules={[EffectCoverflow]}
                  className="mySwiper"
                >
                  {product.products.map((product) => (
                    <SwiperSlide
                      style={{
                        width: "250px",
                        maxHeight: "350px",
                        userSelect: "none",
                        backgroundColor: "white",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                      key={product.id}
                    >
                      <img
                        src={product.image}
                        style={{
                          width: "100%",
                          height: "100px",
                          objectFit: "cover",
                        }}
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
                          {product.name.length > 15
                            ? product.name.slice(0, 15) + "..."
                            : product.name}
                        </Typography>
                        <Typography variant="caption">
                          {product.info.length > 50
                            ? product.info.slice(0, 50) + "..."
                            : product.info}
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight={"bold"}
                          color="primary"
                          align="right"
                        >
                          {product.price}EGP
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
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
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              dispatch(setProductId(product.id));
                              dispatch(changeDialog("product"));
                            }}
                          >
                            details
                          </Button>
                        </Box>
                      </Box>
                    </SwiperSlide>
                  ))}
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
        }
      })}
    </>
  );
};

export default Products;
