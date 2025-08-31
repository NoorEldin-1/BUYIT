import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendUrl, fileUrl } from "../main";
import axios from "axios";
import { changeDialog } from "./dialogSlice";

export const getTotalProducts = createAsyncThunk(
  "product/getTotalProducts",
  async () => {
    const res = await axios.get(`${backendUrl}/product/total`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const createProduct = createAsyncThunk("createProduct", async (info) => {
  const formData = new FormData();
  formData.append("name", info.name);
  formData.append("info", info.info);
  formData.append("price", info.price);
  formData.append("image", info.image);
  if (info.images.length > 0) {
    info.images.forEach((image) => {
      formData.append("images[]", image);
    });
  }

  const res = await axios.post(
    `${backendUrl}/product/create/${info.categoryId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
});

export const editProduct = createAsyncThunk(
  "editProduct",
  async (info, { dispatch }) => {
    const formData = new FormData();
    formData.append("name", info.name);
    formData.append("info", info.info);
    formData.append("price", info.price);
    formData.append("category_id", info.categoryId);
    if (info.image) {
      formData.append("image", info.image);
    }
    if (info.images.length > 0) {
      info.images.forEach((image) => {
        formData.append("images[]", image);
      });
    }

    const res = await axios.post(
      `${backendUrl}/product/edit/${info.product_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );

    dispatch(showProduct(info.product_id));
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (productId, { dispatch }) => {
    const res = await axios.delete(
      `${backendUrl}/product/delete/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(changeDialog("no dialog"));
    dispatch(getAllProducts());
    return res.data;
  }
);

export const addEventProduct = createAsyncThunk(
  "addEventProduct",
  async (productId, { dispatch }) => {
    const res = await axios.put(
      `${backendUrl}/product/addEvent/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(changeDialog("no dialog"));
    return res.data;
  }
);

export const removeEventProduct = createAsyncThunk(
  "removeEventProduct",
  async (productId, { dispatch }) => {
    const res = await axios.put(
      `${backendUrl}/product/removeEvent/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(changeDialog("no dialog"));
    return res.data;
  }
);

export const getAllEvents = createAsyncThunk("getAllEvents", async () => {
  const res = await axios.get(`${backendUrl}/product/events`);
  return res.data;
});

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
  const res = await axios.get(`${backendUrl}/product/all`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
  return res.data;
});

export const getLatestProducts = createAsyncThunk(
  "getLatestProducts",
  async () => {
    const res = await axios.get(`${backendUrl}/product/all`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const getAllNextProducts = createAsyncThunk(
  "getAllNextProducts",
  async (link) => {
    const res = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const showProduct = createAsyncThunk("showProduct", async (id) => {
  const res = await axios.get(`${backendUrl}/product/show/${id}`);
  return res.data;
});

export const deleteProductImage = createAsyncThunk(
  "deleteProductImage",
  async (id, { dispatch }) => {
    const res = await axios.delete(`${backendUrl}/product-image/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    dispatch(changeDialog("no dialog"));
    return res.data;
  }
);

export const showCategoryProducts = createAsyncThunk(
  "showCategoryProducts",
  async (id) => {
    const res = await axios.get(`${backendUrl}/product/category/${id}`);
    return res.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    totalProducts: 0,
    products: [],
    events: [],
    latestProducts: [],
    nextProductsLink: "",
    categoryProducts: [],
    productInfo: {},
    productId: "",
    imageId: "",
    nextProductsLoading: false,
    latestProductsLoading: false,
    createProductLoading: false,
    editProductLoading: false,
    deleteProductLoading: false,
    getAllProductsLoading: false,
    deleteProductImageLoading: false,
    showCategoryProductsLoading: false,
    addEventProductLoading: false,
    removeEventProductLoading: false,
    getAllEventsLoading: false,
  },
  reducers: {
    setImageId: (state, action) => {
      state.imageId = action.payload;
    },
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalProducts.pending, () => {})
      .addCase(getTotalProducts.fulfilled, (state, action) => {
        state.totalProducts = action.payload.total;
      })
      .addCase(getLatestProducts.pending, (state) => {
        state.latestProductsLoading = true;
      })
      .addCase(getLatestProducts.fulfilled, (state, action) => {
        action.payload.products.data.map((product) => {
          product.image = `${fileUrl}${product.image}`;
          return product;
        });
        state.latestProducts = action.payload.products.data;
        state.latestProductsLoading = false;
      })
      .addCase(createProduct.pending, (state) => {
        state.createProductLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createProductLoading = false;
      })
      .addCase(editProduct.pending, (state) => {
        state.editProductLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.editProductLoading = false;
      })
      .addCase(addEventProduct.pending, (state) => {
        state.addEventProductLoading = true;
      })
      .addCase(addEventProduct.fulfilled, (state, action) => {
        state.addEventProductLoading = false;
        state.products = state.products.map((product) => {
          if (product.id === state.productId) {
            product.is_event = "yes";
          }
          return product;
        });
        state.categoryProducts = state.categoryProducts.map((product) => {
          if (product.id === state.productId) {
            product.is_event = "yes";
          }
          return product;
        });
      })
      .addCase(removeEventProduct.pending, (state) => {
        state.removeEventProductLoading = true;
      })
      .addCase(removeEventProduct.fulfilled, (state, action) => {
        state.removeEventProductLoading = false;
        state.products = state.products.map((product) => {
          if (product.id === state.productId) {
            product.is_event = "no";
          }
          return product;
        });
        state.events = state.events.filter(
          (product) => product.id !== state.productId
        );
        state.categoryProducts = state.categoryProducts.map((product) => {
          if (product.id === state.productId) {
            product.is_event = "no";
          }
          return product;
        });
      })
      .addCase(getAllEvents.pending, (state) => {
        state.getAllEventsLoading = true;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.getAllEventsLoading = false;
        action.payload.products.map((product) => {
          product.image = `${fileUrl}${product.image}`;
          return product;
        });
        state.events = action.payload.products;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProductLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteProductLoading = false;
        state.products = state.products.filter(
          (product) => product.id !== state.productId
        );
        state.productId = "";
      })
      .addCase(getAllProducts.pending, (state) => {
        state.getAllProductsLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.getAllProductsLoading = false;
        state.nextProductsLink = action.payload.products.next_page_url;

        action.payload.products.data.map((product) => {
          product.image = `${fileUrl}${product.image}`;
          return product;
        });

        state.products = action.payload.products.data;
      })
      .addCase(getAllNextProducts.pending, (state) => {
        state.nextProductsLoading = true;
      })
      .addCase(getAllNextProducts.fulfilled, (state, action) => {
        state.nextProductsLoading = false;
        state.nextProductsLink = action.payload.products.next_page_url;

        action.payload.products.data.map((product) => {
          product.image = `${fileUrl}${product.image}`;
          return product;
        });

        state.products = [...state.products, ...action.payload.products.data];
      })
      .addCase(showProduct.fulfilled, (state, action) => {
        action.payload.product.images.map((image) => {
          image.image = `${fileUrl}${image.image}`;
          return image;
        });
        state.productInfo = action.payload.product;
      })
      .addCase(deleteProductImage.pending, (state) => {
        state.deleteProductImageLoading = true;
      })
      .addCase(deleteProductImage.fulfilled, (state, action) => {
        state.deleteProductImageLoading = false;
        state.productInfo.images = state.productInfo.images.filter(
          (image) => image.id !== state.imageId
        );
      })
      .addCase(showCategoryProducts.pending, (state) => {
        state.showCategoryProductsLoading = true;
      })
      .addCase(showCategoryProducts.fulfilled, (state, action) => {
        state.showCategoryProductsLoading = false;

        action.payload.products.map((product) => {
          product.image = `${fileUrl}${product.image}`;
          return product;
        });

        state.categoryProducts = action.payload.products;
      });
  },
});

export const { setImageId, setProductId } = productSlice.actions;
export default productSlice.reducer;
