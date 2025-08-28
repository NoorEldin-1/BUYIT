import AnimatedHeader from "./components/AnimatedHeader";
import Events from "./components/Events";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import ProductDialog from "./components/ProductDialog";
import CartDialog from "./components/CartDialog";
import InformationDialog from "./components/InformationDialog";
import LoginAlertDialog from "./components/LoginAlertDialog";
import DeleteCommentDialog from "./components/DeleteCommentDialog";
import { Route, Routes } from "react-router";
import CategoryProducts from "./components/CategoryProducts";
import DeleteFavProduct from "./components/DeleteFavProduct";
import GoogleCallback from "./components/GoogleCallback";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllCategories } from "./store/categoriesSlice";
import { Button, Divider } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function App() {
  const dialog = useSelector((state) => state.dialog);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <AnimatedHeader dir="reverse" />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Events />
              <AnimatedHeader dir="normal" />
              <Products />
            </>
          }
        />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/google-callback" element={<GoogleCallback />} />
      </Routes>
      <Divider
        sx={{
          backgroundColor: "primary.main",
          height: "2px",
          width: "50%",
          mx: "auto",
        }}
      />
      <Button
        startIcon={<WhatsAppIcon />}
        variant="outlined"
        color="primary"
        size="small"
        sx={{ width: "fit-content", mx: "auto", display: "flex", my: 2 }}
      >
        contact us on whatsapp
      </Button>

      {dialog === "product" && <ProductDialog />}
      {dialog === "cart" && <CartDialog />}
      {dialog === "information" && <InformationDialog />}
      {dialog === "login" && <LoginAlertDialog />}
      {dialog === "deleteComment" && <DeleteCommentDialog />}
      {dialog === "deleteFavProduct" && <DeleteFavProduct />}
    </>
  );
}

export default App;
