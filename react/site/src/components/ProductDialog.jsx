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
import { useCallback, useEffect, useMemo, useState } from "react";
import { getProduct } from "../store/productSlice";
import { changeDialog } from "../store/dialogSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addToCart } from "../store/cartSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toggleSave } from "../store/savesSlice";
import {
  getAllComments,
  setCommentId,
  createComment,
} from "../store/commentsSlice";
import { Mousewheel } from "swiper/modules";

const ProductDialog = () => {
  const navigate = useNavigate();
  const product = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.product.getProductLoading);
  const productId = useSelector((state) => state.product.productId);
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.dialog);
  const [activeImage, setActiveImage] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [toggleSaveIcon, setToggleSaveIcon] = useState("not save");
  const toggleSaveLoading = useSelector(
    (state) => state.saves.toggleSaveLoading
  );
  const saves = useSelector((state) => state.saves.saves);
  const comments = useSelector((state) => state.comments.comments);
  const getAllCommentsLoading = useSelector(
    (state) => state.comments.getAllCommentsLoading
  );
  const createCommentLoading = useSelector(
    (state) => state.comments.createCommentLoading
  );
  const [commentsList, setCommentsList] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    setActiveImage(product?.image);
    setProductPrice(product?.price);
  }, [product?.image, product?.price]);

  useEffect(() => {
    if (saves.some((save) => save.product.id === productId)) {
      setToggleSaveIcon("save");
    } else {
      setToggleSaveIcon("not save");
    }
  }, [saves, productId]);

  const handleSave = useCallback(
    (productId) => {
      if (!window.localStorage.getItem("token")) {
        dispatch(changeDialog("login"));
        return;
      }
      dispatch(toggleSave(productId));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getAllComments(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (comments.length > 0) {
      setCommentsList(comments);
    } else {
      setCommentsList([]);
    }
  }, [comments]);

  const handleCreateComment = useCallback(() => {
    if (!window.localStorage.getItem("token")) {
      dispatch(changeDialog("login"));
      return;
    }
    if (!commentText.trim()) {
      return;
    }
    dispatch(createComment({ product_id: productId, comment: commentText }));
    setCommentText("");
  }, [commentText, dispatch, productId]);

  const swiperElement = useCallback(
    (e) => {
      return (
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
              scale: 0.5,
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
              objectFit: "contain",
            }}
          />
        </SwiperSlide>
      );
    },
    [activeImage]
  );

  const changePriceElement = useMemo(() => {
    return (
      <FormControl>
        <RadioGroup
          defaultValue={1}
          row
          onChange={(e) => setProductPrice(product.price / e.target.value)}
        >
          <FormControlLabel value={1} control={<Radio />} label="normal" />
          <FormControlLabel value={3} control={<Radio />} label="3 months" />
          <FormControlLabel value={6} control={<Radio />} label="6 months" />
          <FormControlLabel value={12} control={<Radio />} label="1 year" />
          <FormControlLabel value={24} control={<Radio />} label="2 years" />
        </RadioGroup>
      </FormControl>
    );
  }, [product.price]);

  const commentTextElement = useMemo(() => {
    return (
      <TextField
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        label="add comment"
        placeholder="type..."
        color="primary"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        sx={{
          flexGrow: 1,
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
      />
    );
  }, [commentText]);

  const commentElement = useCallback(
    (comment) => {
      return (
        <Box key={comment.id}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <img
                src={`https://ui-avatars.com/api/?name=${comment.user.full_name}&background=ad1457&color=ffffff&size=128`}
                alt=""
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
              <Typography fontWeight={"bold"} variant="body2">
                {comment.user.full_name}
              </Typography>
            </Box>
            {comment.user.full_name === window.localStorage.getItem("name") && (
              <IconButton
                color="error"
                size="small"
                onClick={() => {
                  dispatch(setCommentId(comment.id));
                  dispatch(changeDialog("deleteComment"));
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
          <Typography sx={{ pl: 6, wordBreak: "break-word" }}>
            {comment.comment}
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
    },
    [dispatch]
  );

  const element = useMemo(() => {
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
            <DialogContent
              dividers={scroll === "paper"}
              sx={{ "&:first-of-type": { pt: 2 } }}
            >
              <Box>
                <img
                  src={activeImage}
                  alt=""
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                  }}
                />
                <Swiper
                  spaceBetween={10}
                  slidesPerView={"auto"}
                  mousewheel={true}
                  modules={[Mousewheel]}
                  className="mySwiper"
                >
                  {product?.images?.map((e) => swiperElement(e))}
                </Swiper>
                <Typography
                  component="div"
                  variant="h6"
                  fontWeight={"bold"}
                  mt={2}
                >
                  {product.name}
                </Typography>
                <Typography
                  component="div"
                  variant="body2"
                  sx={{ display: "block", mb: 2 }}
                >
                  {product.info}
                </Typography>
                <Typography
                  onClick={() => {
                    navigate(`/category/${product.category.id}`);
                    dispatch(changeDialog("no dialog"));
                  }}
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
                {changePriceElement}
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  color="primary"
                  align="right"
                >
                  {Math.ceil(productPrice)}EGP
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    variant="h6"
                  >
                    comments
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    {commentTextElement}
                    {createCommentLoading ? (
                      <CircularProgress size={20} color="primary" />
                    ) : (
                      <IconButton color="primary" onClick={handleCreateComment}>
                        <SendIcon />
                      </IconButton>
                    )}
                  </Box>
                  {getAllCommentsLoading ? (
                    <CircularProgress
                      size={20}
                      color="primary"
                      sx={{ display: "flex", mx: "auto", my: 2 }}
                    />
                  ) : commentsList.length > 0 ? (
                    commentsList.map((comment) => commentElement(comment))
                  ) : (
                    <Typography
                      fontWeight={"bold"}
                      textTransform={"uppercase"}
                      align="center"
                      variant="body1"
                    >
                      no comments
                    </Typography>
                  )}
                </Box>
              </Box>
            </DialogContent>
            <Divider sx={{ backgroundColor: "primary.main" }} />
            <DialogActions>
              {toggleSaveLoading ? (
                <CircularProgress size={20} />
              ) : (
                <IconButton
                  color="primary"
                  onClick={() => handleSave(product.id)}
                >
                  {toggleSaveIcon === "save" ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              )}
              <Button
                onClick={() => dispatch(addToCart(product))}
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
  }, [
    activeImage,
    changePriceElement,
    commentElement,
    commentTextElement,
    commentsList,
    createCommentLoading,
    dialog,
    dispatch,
    getAllCommentsLoading,
    handleCreateComment,
    handleSave,
    loading,
    navigate,
    product,
    productPrice,
    swiperElement,
    toggleSaveIcon,
    toggleSaveLoading,
  ]);

  return element;
};

export default ProductDialog;
