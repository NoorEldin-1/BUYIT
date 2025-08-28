import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProduct } from "../store/productSlice";
import { changeDialog } from "../store/dialogSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductDialog = () => {
  const navigate = useNavigate();
  const commentsCount = Array.from({ length: 10 });
  const product = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.product.getProductLoading);
  const productId = useSelector((state) => state.product.productId);
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.dialog);
  const [activeImage, setActiveImage] = useState("");
  const [productPrice, setProductPrice] = useState(0);

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    setActiveImage(product?.image);
    setProductPrice(product?.price);
  }, [product?.image, product?.price]);

  return (
    <Dialog
      open={dialog === "product"}
      scroll={"paper"}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ textTransform: "uppercase" }}>
        product details
      </DialogTitle>
      <Divider sx={{ backgroundColor: "primary.main" }} />
      {loading ? (
        <CircularProgress
          size={50}
          color="primary"
          sx={{
            my: 5,
            display: "flex",
            mx: "auto",
          }}
        />
      ) : (
        <>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText>
              <img
                src={activeImage}
                alt=""
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <Swiper
                spaceBetween={10}
                slidesPerView={"auto"}
                className="mySwiper"
              >
                {product?.images?.map((e) => (
                  <SwiperSlide
                    style={{
                      width: "75px",
                      maxHeight: "75px",
                      userSelect: "none",
                      backgroundColor: "white",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "10px",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "0.2s",
                      ...(activeImage === e.image && {
                        scale: 0.9,
                      }),
                    }}
                    key={e.id}
                    onClick={() => setActiveImage(e.image)}
                  >
                    <img
                      src={e.image}
                      style={{
                        width: "100%",
                        height: "75px",
                        objectFit: "cover",
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Typography variant="h6" fontWeight={"bold"} mt={2}>
                {product.name}
              </Typography>
              <Typography variant="body2" sx={{ display: "block", mb: 2 }}>
                {product.info}
              </Typography>
              <Typography
                onClick={() => navigate(`/category/${product.category.id}`)}
                variant="body2"
                sx={{
                  width: "fit-content",
                  mb: 2,
                  fontWeight: "bold",
                  backgroundColor: "primary.main",
                  color: "white",
                  px: 1,
                  borderRadius: "20px",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                {product?.category?.name}
              </Typography>
              <FormControl>
                <RadioGroup
                  defaultValue={1}
                  row
                  onChange={(e) =>
                    setProductPrice(product.price / e.target.value)
                  }
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="normal"
                  />
                  <FormControlLabel
                    value={3}
                    control={<Radio />}
                    label="3 months"
                  />
                  <FormControlLabel
                    value={6}
                    control={<Radio />}
                    label="6 months"
                  />
                  <FormControlLabel
                    value={12}
                    control={<Radio />}
                    label="1 year"
                  />
                  <FormControlLabel
                    value={24}
                    control={<Radio />}
                    label="2 years"
                  />
                </RadioGroup>
              </FormControl>
              <Typography
                variant="h6"
                fontWeight={"bold"}
                color="primary"
                align="right"
              >
                {productPrice}EGP
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography
                  fontWeight={"bold"}
                  textTransform={"uppercase"}
                  variant="h6"
                >
                  comments
                </Typography>
                <TextField
                  label="add comment"
                  placeholder="type..."
                  color="primary"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  maxRows={3}
                  sx={{
                    "& .MuiInputBase-root": {
                      "& textarea": {
                        "&::-webkit-scrollbar": {
                          display: "none",
                        },
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      },
                    },
                  }}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <SendIcon
                          sx={{ cursor: "pointer", color: "primary.main" }}
                        />
                      ),
                    },
                  }}
                />
                {commentsCount.map((_, index) => {
                  return (
                    <Box key={index}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <img
                            src="https://ui-avatars.com/api/?name=Guest+User&background=ad1457&color=ffffff&size=128"
                            alt=""
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                          <Typography>user name</Typography>
                        </Box>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() =>
                            dispatch(changeDialog("deleteComment"))
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                      <Typography sx={{ pl: 6 }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ab hic voluptates recusandae. Placeat itaque architecto
                        cupiditate totam vel vitae doloremque deleniti, adipisci
                        quis iste magnam ipsam sunt omnis, aspernatur sed.
                      </Typography>
                      <Divider
                        sx={{
                          backgroundColor: "primary.main",
                          width: "50%",
                          mx: "auto",
                          mt: 1,
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </DialogContentText>
          </DialogContent>
          <Divider sx={{ backgroundColor: "primary.main" }} />
          <DialogActions>
            <Button
              onClick={() => dispatch(changeDialog("no dialog"))}
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              size="small"
            >
              buyit
            </Button>
            <Button
              onClick={() => dispatch(changeDialog("no dialog"))}
              variant="outlined"
              size="small"
            >
              close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default ProductDialog;
