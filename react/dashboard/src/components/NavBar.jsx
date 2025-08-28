import { IconButton, Toolbar, Typography } from "@mui/material";
import { AppBar } from "./Dashboard";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = ({ open, handleDrawerOpen }) => {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              mr: 2,
            },
            open && { display: "none" },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {window.localStorage.getItem("full_name")}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
