import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DrawerHeader, Main } from "./Dashboard";
import UploadIcon from "@mui/icons-material/Upload";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, setImageId, showProduct } from "../features/productSlice";
import { useParams } from "react-router";
import { getAllCategories } from "../features/categorySlice";
import { changeDialog } from "../features/dialogSlice";

const EditProduct = ({ open }) => {
  const { id } = useParams();
  const imageInputRef = useRef(null);
  const multipleImageInputRef = useRef(null);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const loading = useSelector((state) => state.product.editProductLoading);
  const productInfo = useSelector((state) => state.product.productInfo);
  const [info, setInfo] = useState({
    name: "",
    price: "",
    info: "",
    image: null,
    images: [],
    categoryId: "",
    product_id: id,
  });

  useEffect(() => {
    dispatch(showProduct(id));
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  useEffect(() => {
    if (productInfo) {
      setInfo({
        name: productInfo.name,
        price: productInfo.price,
        info: productInfo.info,
        image: null,
        images: [],
        categoryId: productInfo.category_id,
        product_id: productInfo.id,
      });
    }
  }, [productInfo]);

  const handleEditProduct = useCallback(() => {
    if (
      !info.name.trim() ||
      !info.price ||
      !info.info.trim() ||
      !info.categoryId
    )
      return;
    if (
      info.name === productInfo.name &&
      info.price === productInfo.price &&
      info.info === productInfo.info &&
      info.categoryId === productInfo.category_id &&
      info.images.length <= 0 &&
      !info.image
    )
      return;
    dispatch(editProduct(info));
    setInfo({
      name: "",
      price: "",
      info: "",
      image: null,
      images: [],
      categoryId: "",
    });
    imageInputRef.current.value = "";
    multipleImageInputRef.current.value = "";
  }, [
    dispatch,
    info,
    productInfo.category_id,
    productInfo.info,
    productInfo.name,
    productInfo.price,
  ]);

  const nameElement = useMemo(() => {
    return (
      <TextField
        type="text"
        required
        onChange={(e) => setInfo((prev) => ({ ...prev, name: e.target.value }))}
        value={info.name}
        label="product name"
        variant="outlined"
        fullWidth
      />
    );
  }, [info.name]);

  const priceElement = useMemo(() => {
    return (
      <TextField
        type="number"
        required
        onChange={(e) =>
          setInfo((prev) => ({ ...prev, price: e.target.value }))
        }
        value={info.price}
        label="product price"
        variant="outlined"
        fullWidth
      />
    );
  }, [info.price]);

  const infoElement = useMemo(() => {
    return (
      <TextField
        type="text"
        required
        multiline
        minRows={6}
        maxRows={6}
        onChange={(e) => setInfo((prev) => ({ ...prev, info: e.target.value }))}
        value={info.info}
        label="product info"
        variant="outlined"
        fullWidth
      />
    );
  }, [info.info]);

  const categoryElement = useMemo(() => {
    return (
      <FormControl fullWidth required>
        <InputLabel id="demo-simple-select-label">category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={info.categoryId}
          label="category"
          onChange={(e) =>
            setInfo((prev) => ({ ...prev, categoryId: e.target.value }))
          }
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }, [categories, info.categoryId]);

  const imagesElement = useMemo(() => {
    return (
      <>
        <input
          type="file"
          name=""
          id=""
          accept="image/*"
          multiple
          ref={multipleImageInputRef}
          hidden
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              const files = Array.from(e.target.files).filter((file) =>
                file.type.startsWith("image/")
              );
              if (files.length === 0) return;
              setInfo((prev) => ({
                ...prev,
                images: [...files, ...prev.images],
              }));
            }
          }}
        />
        <input
          type="file"
          name=""
          id=""
          accept="image/*"
          ref={imageInputRef}
          hidden
          onChange={(e) => {
            if (
              e.target.files &&
              e.target.files[0] &&
              e.target.files[0].type.startsWith("image/")
            ) {
              setInfo((prev) => ({ ...prev, image: e.target.files[0] }));
            }
          }}
        />
        {info.image && (
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              width: "100px",
              height: "100px",
              p: 2,
            }}
          >
            <img
              src={URL.createObjectURL(info.image)}
              alt="product image"
              width="100%"
              height="100%"
            />
            <IconButton
              color="error"
              onClick={() => setInfo((prev) => ({ ...prev, image: null }))}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          sx={{ width: "fit-content" }}
          onClick={() => imageInputRef.current.click()}
        >
          change main image
        </Button>
        {productInfo.images && (
          <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {productInfo.images.map((image) => (
              <Box
                key={image.id}
                sx={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100px",
                  height: "100px",
                  p: 2,
                }}
              >
                <img
                  src={image.image}
                  alt="product image"
                  width="100%"
                  height="100%"
                />
                <IconButton
                  color="error"
                  onClick={() => {
                    dispatch(setImageId(image.id));
                    dispatch(changeDialog("deleteImage"));
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
        {info.images.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              uploaded images
            </Typography>
            <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {info.images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100px",
                    height: "100px",
                    p: 2,
                  }}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt="product image"
                    width="100%"
                    height="100%"
                  />
                  <IconButton
                    color="error"
                    onClick={() => {
                      setInfo((prev) => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index),
                      }));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </>
        )}
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          sx={{ width: "fit-content" }}
          onClick={() => multipleImageInputRef.current.click()}
        >
          add image
        </Button>
      </>
    );
  }, [dispatch, info.image, info.images, productInfo.images]);

  const element = useMemo(() => {
    return (
      <Main open={open} sx={{ overflow: "hidden" }}>
        <DrawerHeader />
        <Box>
          <Typography variant="h4" gutterBottom>
            Edit Product
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {nameElement}
            {priceElement}
            {infoElement}
            {categoryElement}
            {imagesElement}
            <Button
              variant="contained"
              color="success"
              sx={{ width: "fit-content", ml: "auto" }}
              onClick={handleEditProduct}
              disabled={loading}
              loading={loading}
            >
              edit
            </Button>
          </Box>
        </Box>
      </Main>
    );
  }, [
    categoryElement,
    handleEditProduct,
    imagesElement,
    infoElement,
    loading,
    nameElement,
    open,
    priceElement,
  ]);

  return element;
};

export default EditProduct;
