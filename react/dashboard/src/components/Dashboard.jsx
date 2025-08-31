import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { accordionSummaryClasses } from "@mui/material/AccordionSummary";

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

export const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

export const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Dashboard = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const dialog = useSelector((state) => state.dialog);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    dispatch(getTotalUsers());
    dispatch(getTotalCategories());
    dispatch(getTotalProducts());
    dispatch(getLatestUsers());
    dispatch(getLatestCategories());
    dispatch(getLatestProducts());
  }, [dispatch]);

  const indexElement = useMemo(() => {
    return (
      <>
        <Side open={open} handleDrawerClose={handleDrawerClose} />
        <NavBar open={open} handleDrawerOpen={handleDrawerOpen} />
      </>
    );
  }, [handleDrawerClose, handleDrawerOpen, open]);

  const dialogs = useMemo(() => {
    if (dialog === "logout") {
      return <Logout />;
    }
    if (dialog === "createCategory") {
      return <CreateCategory />;
    }
    if (dialog === "deleteCategory") {
      return <DeleteCategory />;
    }
    if (dialog === "editCategory") {
      return <EditCategory />;
    }
    if (dialog === "deleteImage") {
      return <DeleteImage />;
    }
    if (dialog === "deleteProduct") {
      return <DeleteProduct />;
    }
    if (dialog === "deleteUser") {
      return <DeleteUser />;
    }
    if (dialog === "addEvent") {
      return <AddEvent />;
    }
    if (dialog === "removeEvent") {
      return <RemoveEvent />;
    }
    return null;
  }, [dialog]);

  const element = useMemo(() => {
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {indexElement}
        <Routes>
          <Route path="/" element={<MainWidget open={open} />} />
          <Route path="/edit-account" element={<EditAccount open={open} />} />
          <Route path="/all-categories" element={<AllCategory open={open} />} />
          <Route
            path="/create-product"
            element={<CreateProduct open={open} />}
          />
          <Route path="/all-products" element={<AllProducts open={open} />} />
          <Route
            path="/edit-product/:id"
            element={<EditProduct open={open} />}
          />
          <Route
            path="/category/:id"
            element={<CategoryProducts open={open} />}
          />
          <Route path="/users" element={<AllUsers open={open} />} />
          <Route path="/events" element={<Events open={open} />} />
        </Routes>
        {dialogs}
      </Box>
    );
  }, [dialogs, indexElement, open]);

  return element;
};

export default Dashboard;
