import { useMemo } from "react";
import { DrawerHeader, drawerWidth } from "./Dashboard";
import { useTheme } from "@emotion/react";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupIcon from "@mui/icons-material/Group";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { changeDialog } from "../features/dialogSlice";
import EventIcon from "@mui/icons-material/Event";

const Side = ({ handleDrawerClose, open }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dashboardList = useMemo(() => {
    const list = [
      { name: "dashboard", icon: <DashboardIcon /> },
      { name: "create category", icon: <AddCircleOutlineIcon /> },
      { name: "all categories", icon: <CategoryIcon /> },
      { name: "create product", icon: <AddCircleOutlineIcon /> },
      { name: "all products", icon: <ProductionQuantityLimitsIcon /> },
      { name: "events", icon: <EventIcon /> },
      { name: "users", icon: <GroupIcon /> },
      { name: "edit account", icon: <EditIcon /> },
      { name: "logout", icon: <LogoutIcon /> },
    ];
    return (
      <List>
        {list.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                if (text.name === "dashboard") navigate("/");
                if (text.name === "create category")
                  dispatch(changeDialog("createCategory"));
                if (text.name === "all categories") navigate("/all-categories");
                if (text.name === "create product") navigate("/create-product");
                if (text.name === "all products") navigate("/all-products");
                if (text.name === "events") navigate("/events");
                if (text.name === "users") navigate("/users");
                if (text.name === "edit account") navigate("/edit-account");
                if (text.name === "logout") dispatch(changeDialog("logout"));
              }}
            >
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText
                primary={text.name}
                sx={{ textTransform: "capitalize" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  }, [dispatch, navigate]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      {dashboardList}
    </Drawer>
  );
};

export default Side;
