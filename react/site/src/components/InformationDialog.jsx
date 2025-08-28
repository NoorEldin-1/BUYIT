import GoogleIcon from "@mui/icons-material/Google";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useNavigate } from "react-router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { login, logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { changeDialog } from "../store/dialogSlice";

const InformationDialog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loginLoading);
  const logoutLoading = useSelector((state) => state.auth.logoutLoading);
  const [openCategoryList, setOpenCategoryList] = useState(false);
  const [openFavoriteList, setOpenFavoriteList] = useState(false);
  const [openAboutUsList, setOpenAboutUsList] = useState(false);
  const count = Array.from({ length: 10 });
  const dialog = useSelector((state) => state.dialog);
  const categories = useSelector((state) => state.categories.categories);

  const handleOpenCategoryList = () => {
    setOpenCategoryList(!openCategoryList);
  };
  const handleOpenAboutUsList = () => {
    setOpenAboutUsList(!openAboutUsList);
  };
  const handleOpenFavoriteList = () => {
    setOpenFavoriteList(!openFavoriteList);
  };
  return (
    <Dialog
      open={dialog === "information"}
      scroll={"paper"}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ textTransform: "uppercase" }}>
        information & Account
      </DialogTitle>
      <Divider sx={{ backgroundColor: "primary.main" }} />
      <DialogContent dividers={scroll === "paper"}>
        <DialogContentText>
          <List component="nav">
            <ListItemButton onClick={handleOpenCategoryList}>
              <ListItemIcon>
                <CategoryIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="categories" />
              {openCategoryList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCategoryList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {categories.length > 0 ? (
                  categories.map((category) => {
                    return (
                      <ListItemButton
                        sx={{ pl: 4 }}
                        key={category.id}
                        onClick={() => navigate(`/category/${category.id}`)}
                      >
                        <ListItemText primary={category.name} />
                      </ListItemButton>
                    );
                  })
                ) : (
                  <Typography variant="body2" color="error">
                    No categories found
                  </Typography>
                )}
              </List>
            </Collapse>
            <ListItemButton onClick={handleOpenFavoriteList}>
              <ListItemIcon>
                <FavoriteIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="favorite" />
              {openFavoriteList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openFavoriteList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {count.map((_, index) => (
                  <ListItemButton
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(changeDialog("product"));
                    }}
                    sx={{
                      pl: 4,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    key={index}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <img
                        src={"https://swiperjs.com/demos/images/nature-1.jpg"}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <Typography variant="body2" fontWeight={"bold"}>
                          product title
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight={"bold"}
                          color="primary"
                        >
                          1200EGP
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(changeDialog("deleteFavProduct"));
                      }}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
            <ListItemButton onClick={handleOpenAboutUsList}>
              <ListItemIcon>
                <InfoIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="about us" />
              {openAboutUsList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openAboutUsList} timeout="auto" unmountOnExit>
              <Typography
                variant="body2"
                pl={5}
                align="center"
                lineHeight={1.5}
              >
                هذا الموقع عبارة عن موقع تجاري بنعرض فيه بعض المنتجات الذي يمكنك
                شرائها بالتقسيط عملية الشراء بتكون عن طريق الواتساب تقدر تستفسر
                اكتر عن المنتج او شرائه
                <br />
                This site is a commercial site where we display some products
                that you can buy in installments. The purchase process is done
                via WhatsApp. You can inquire more about the product or buy it.
              </Typography>
            </Collapse>
            <Button
              startIcon={<WhatsAppIcon />}
              variant="outlined"
              fullWidth
              size="small"
            >
              contact us on whatsapp
            </Button>
          </List>
        </DialogContentText>
      </DialogContent>
      <Divider sx={{ backgroundColor: "primary.main" }} />
      <DialogActions>
        {window.localStorage.getItem("token") ? (
          <Button
            onClick={() => dispatch(logout())}
            variant="contained"
            startIcon={<LogoutIcon />}
            disabled={logoutLoading}
            loading={logoutLoading}
          >
            logout
          </Button>
        ) : (
          <Button
            onClick={() => {
              dispatch(login());
            }}
            variant="contained"
            startIcon={<GoogleIcon />}
            disabled={loading}
            loading={loading}
          >
            signin
          </Button>
        )}
        <Button
          onClick={() => dispatch(changeDialog("no dialog"))}
          variant="outlined"
        >
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InformationDialog;
