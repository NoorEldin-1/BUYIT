import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import { useEffect, useState } from "react";
import MainWidget from "./MainWidget";
import Side from "./Side";
import NavBar from "./NavBar";
import { Route, Routes } from "react-router";
import EditAccount from "./EditAccount";
import { useDispatch, useSelector } from "react-redux";
import Logout from "./Logout";
import CreateCategory from "./CreateCategory";
import AllCategory from "./AllCategory";
import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";
import CreateProduct from "./CreateProduct";
import AllProducts from "./AllProducts";
import EditProduct from "./EditProduct";
import DeleteImage from "./DeleteImage";
import DeleteProduct from "./DeleteProduct";
import CategoryProducts from "./CategoryProducts";
import AllUsers from "./AllUsers";
import DeleteUser from "./DeleteUser";
import AddEvent from "./AddEvent";
import Events from "./Events";
import RemoveEvent from "./RemoveEvent";
import { getLatestUsers, getTotalUsers } from "../features/userSlice";
import {
  getLatestCategories,
  getTotalCategories,
} from "../features/categorySlice";
import { getLatestProducts, getTotalProducts } from "../features/productSlice";

export const drawerWidth = 240;

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Dashboard = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dialog = useSelector((state) => state.dialog);

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      await dispatch(getTotalUsers());
      await dispatch(getTotalCategories());
      await dispatch(getTotalProducts());
      await dispatch(getLatestUsers());
      await dispatch(getLatestCategories());
      await dispatch(getLatestProducts());
    };

    fetchData();

    intervalId = setInterval(fetchData, 30 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Side open={open} handleDrawerClose={handleDrawerClose} />
      <NavBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Routes>
        <Route path="/" element={<MainWidget open={open} />} />
        <Route path="/edit-account" element={<EditAccount open={open} />} />
        <Route path="/all-categories" element={<AllCategory open={open} />} />
        <Route path="/create-product" element={<CreateProduct open={open} />} />
        <Route path="/all-products" element={<AllProducts open={open} />} />
        <Route path="/edit-product/:id" element={<EditProduct open={open} />} />
        <Route
          path="/category/:id"
          element={<CategoryProducts open={open} />}
        />
        <Route path="/users" element={<AllUsers open={open} />} />
        <Route path="/events" element={<Events open={open} />} />
      </Routes>
      {dialog === "logout" && <Logout />}
      {dialog === "createCategory" && <CreateCategory />}
      {dialog === "deleteCategory" && <DeleteCategory />}
      {dialog === "editCategory" && <EditCategory />}
      {dialog === "deleteImage" && <DeleteImage />}
      {dialog === "deleteProduct" && <DeleteProduct />}
      {dialog === "deleteUser" && <DeleteUser />}
      {dialog === "addEvent" && <AddEvent />}
      {dialog === "removeEvent" && <RemoveEvent />}
    </Box>
  );
};

export default Dashboard;
