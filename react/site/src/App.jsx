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
import GoogleCallback from "./components/GoogleCallback";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { getAllCategories } from "./store/categoriesSlice";
import { Button, Divider } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { allSaves } from "./store/savesSlice";
import AnimatedBar from "./components/AnimatedBar";
import { getAllEvents } from "./store/eventsSlice";
import { getAllProducts } from "./store/landingSlice";

function App() {
  const dialog = useSelector((state) => state.dialog);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleAll = async () => {
      await Promise.all([
        dispatch(getAllEvents()),
        dispatch(getAllProducts()),
        dispatch(getAllCategories()),
        dispatch(allSaves()),
      ]);
    };
    handleAll();
  }, [dispatch]);

  const indexElement = useMemo(() => {
    return (
      <>
        <NavBar />
        <AnimatedBar dir="reverse" />
      </>
    );
  }, []);

  const landingElement = useMemo(() => {
    return (
      <>
        <Events />
        <AnimatedBar dir="normal" />
        <Products />
      </>
    );
  }, []);

  const footer = useMemo(() => {
    return (
      <>
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
          href="https://wa.me/+201015612380"
          target="_blank"
        >
          contact us on whatsapp
        </Button>
      </>
    );
  }, []);

  const dialogs = useMemo(() => {
    if (dialog === "product") {
      return <ProductDialog />;
    } else if (dialog === "cart") {
      return <CartDialog />;
    } else if (dialog === "information") {
      return <InformationDialog />;
    } else if (dialog === "login") {
      return <LoginAlertDialog />;
    } else if (dialog === "deleteComment") {
      return <DeleteCommentDialog />;
    }
  }, [dialog]);

  return (
    <>
      {indexElement}
      <Routes>
        <Route path="/" element={landingElement} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/google-callback" element={<GoogleCallback />} />
      </Routes>
      {footer}
      {dialogs}
    </>
  );
}

export default App;
