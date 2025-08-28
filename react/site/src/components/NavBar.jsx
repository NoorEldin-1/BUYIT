import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Badge,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { changeDialog } from "../store/dialogSlice";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();
  return (
    <Box sx={{ height: "60px" }}>
      <AppBar>
        <Toolbar
          sx={{
            position: "sticky",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "60px",
          }}
        >
          <Typography
            variant="h6"
            textTransform={"uppercase"}
            fontWeight={"bold"}
          >
            buyit.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Badge
              badgeContent={1}
              color="success"
              sx={{ cursor: "pointer" }}
              onClick={() => dispatch(changeDialog("cart"))}
            >
              <ShoppingCartIcon sx={{ color: "white" }} />
            </Badge>
            <IconButton
              sx={{ color: "white" }}
              onClick={() => dispatch(changeDialog("information"))}
            >
              <WidgetsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
