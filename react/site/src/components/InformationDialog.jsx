import GoogleIcon from "@mui/icons-material/Google";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
  CircularProgress,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from "@mui/icons-material/Info";
import { useCallback, useEffect, useMemo, useState } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useNavigate } from "react-router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { login, logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { changeDialog } from "../store/dialogSlice";
import { allSaves, setSaveId, toggleSave } from "../store/savesSlice";
import { setProductId } from "../store/productSlice";

const InformationDialog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loginLoading);
  const logoutLoading = useSelector((state) => state.auth.logoutLoading);
  const [openCategoryList, setOpenCategoryList] = useState(false);
  const [openFavoriteList, setOpenFavoriteList] = useState(false);
  const [openAboutUsList, setOpenAboutUsList] = useState(false);
  const dialog = useSelector((state) => state.dialog);
  const categories = useSelector((state) => state.categories.categories);
  const saves = useSelector((state) => state.saves.saves);
  const toggleSaveLoading = useSelector(
    (state) => state.saves.toggleSaveLoading
  );
  const saveId = useSelector((state) => state.saves.saveId);

  const handleOpenCategoryList = useCallback(() => {
    setOpenCategoryList(!openCategoryList);
  }, [openCategoryList]);
  const handleOpenAboutUsList = useCallback(() => {
    setOpenAboutUsList(!openAboutUsList);
  }, [openAboutUsList]);
  const handleOpenFavoriteList = useCallback(() => {
    setOpenFavoriteList(!openFavoriteList);
  }, [openFavoriteList]);

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      dispatch(allSaves());
    }
  }, [dispatch]);

  const singleCategoryElement = useCallback(
    (category) => {
      return (
        <ListItemButton
          sx={{ pl: 4 }}
          key={category.id}
          onClick={() => {
            dispatch(changeDialog("no dialog"));
            navigate(`/category/${category.id}`);
          }}
        >
          <ListItemText primary={category.name} />
        </ListItemButton>
      );
    },
    [dispatch, navigate]
  );

  const categoryElement = useMemo(() => {
    return (
      <>
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
                return singleCategoryElement(category);
              })
            ) : (
              <Typography variant="body2" align="center" fontWeight={"bold"}>
                No categories found
              </Typography>
            )}
          </List>
        </Collapse>
      </>
    );
  }, [
    categories,
    handleOpenCategoryList,
    openCategoryList,
    singleCategoryElement,
  ]);

  const singeFavProduct = useCallback(
    (save) => {
      return (
        <ListItemButton
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setProductId(save.product.id));
            dispatch(changeDialog("product"));
          }}
          sx={{
            pl: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          key={save.id}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <img
              src={save.product.image}
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
                {save.product.name}
              </Typography>
              <Typography variant="body2" fontWeight={"bold"} color="primary">
                {save.product.price}EGP
              </Typography>
            </Box>
          </Box>
          {saveId === save.product.id ? (
            toggleSaveLoading ? (
              <CircularProgress size={20} color="primary" />
            ) : (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setSaveId(save.product.id));
                  dispatch(toggleSave(save.product.id));
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            )
          ) : (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setSaveId(save.product.id));
                dispatch(toggleSave(save.product.id));
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          )}
        </ListItemButton>
      );
    },
    [dispatch, saveId, toggleSaveLoading]
  );

  const favProductsElement = useMemo(() => {
    if (window.localStorage.getItem("token")) {
      return (
        <>
          <ListItemButton onClick={handleOpenFavoriteList}>
            <ListItemIcon>
              <FavoriteIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="favorite" />
            {openFavoriteList ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openFavoriteList} timeout="auto" unmountOnExit>
            {saves.length > 0 ? (
              <List component="div" disablePadding>
                {saves.map((save) => singeFavProduct(save))}
              </List>
            ) : (
              <Typography
                variant="body2"
                fontWeight={"bold"}
                textTransform={"capitalize"}
                align="center"
              >
                No favorite products found
              </Typography>
            )}
          </Collapse>
        </>
      );
    }
  }, [handleOpenFavoriteList, openFavoriteList, saves, singeFavProduct]);

  const aboutUsElement = useMemo(() => {
    return (
      <>
        <ListItemButton onClick={handleOpenAboutUsList}>
          <ListItemIcon>
            <InfoIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="about us" />
          {openAboutUsList ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAboutUsList} timeout="auto" unmountOnExit>
          <Typography variant="body2" pl={5} align="center" lineHeight={1.5}>
            هذا الموقع عبارة عن موقع تجاري بنعرض فيه بعض المنتجات الذي يمكنك
            شرائها بالتقسيط عملية الشراء بتكون عن طريق الواتساب تقدر تستفسر اكتر
            عن المنتج او شرائه
            <br />
            This site is a commercial site where we display some products that
            you can buy in installments. The purchase process is done via
            WhatsApp. You can inquire more about the product or buy it.
          </Typography>
        </Collapse>
      </>
    );
  }, [handleOpenAboutUsList, openAboutUsList]);

  const authElement = useMemo(() => {
    if (window.localStorage.getItem("token")) {
      return (
        <Button
          onClick={() => dispatch(logout())}
          variant="contained"
          startIcon={<LogoutIcon />}
          disabled={logoutLoading}
          loading={logoutLoading}
        >
          logout
        </Button>
      );
    } else {
      return (
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
      );
    }
  }, [dispatch, loading, logoutLoading]);

  const element = useMemo(() => {
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
          <List component="nav">
            {categoryElement}
            {favProductsElement}
            {aboutUsElement}
            <Button
              startIcon={<WhatsAppIcon />}
              variant="outlined"
              fullWidth
              size="small"
              href="https://wa.me/+201015612380"
              target="_blank"
            >
              contact us on whatsapp
            </Button>
          </List>
        </DialogContent>
        <Divider sx={{ backgroundColor: "primary.main" }} />
        <DialogActions>
          {authElement}
          <Button
            onClick={() => dispatch(changeDialog("no dialog"))}
            variant="outlined"
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }, [
    aboutUsElement,
    authElement,
    categoryElement,
    dialog,
    dispatch,
    favProductsElement,
  ]);

  return element;
};

export default InformationDialog;
