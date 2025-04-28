import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import StoreIcon from "@mui/icons-material/Store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../routing/routes";
import { clearAuthState } from "../../redux/authSlice";
import {
  NOTIFICATION_TYPE,
  emitNotification,
} from "../../utils/emitNotification";
import {clearCartState} from "../../redux/cartSlice";

const loggedInSettings = ["Profile", "Logout"];
const loggedOutSettings = ["Login"];

const Header = (props) => {
  const [anchorElNav, setAnchorElNav] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(false);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const customerId = useSelector((state) => state.auth.customerId);
  const [pages, setPages] = useState(["Dashboard", "Cart", "Orders"])

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (customerId !== null && customerId !== undefined && customerId === '1') {
      setPages(["Dashboard", "Cart", "Orders", "Add Product"]);
    } else {
      setPages(["Dashboard", "Cart", "Orders"]);
    }
  }, [customerId]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavMenuClick = (e, navMenu) => {
    if (accessToken !== null && accessToken !== undefined) {
      if (navMenu === "Dashboard") {
        navigate(ROUTE_PATHS.dashboard);
      } else if (navMenu === "Orders") {
        navigate(ROUTE_PATHS.orders);
      } else if (navMenu === "Cart") {
        navigate(ROUTE_PATHS.cart);
      } else if (navMenu === "Add Product") {
        navigate(ROUTE_PATHS.addProduct);
      } else {
        navigate(ROUTE_PATHS.default);
      }
    } else {
      navigate(ROUTE_PATHS.default);
    }
  };

  const handleUserMenuClick = (e, userMenu) => {
    if (userMenu === "Profile") {
      navigate(ROUTE_PATHS.userProfile);
    }
    if (userMenu === "Logout") {
      dispatch(clearAuthState());
      dispatch(clearCartState());
      emitNotification(
        NOTIFICATION_TYPE.SUCCESS,
        "User logged out successfully"
      );
      navigate(ROUTE_PATHS.login);
    }
    if (userMenu === "Logout") {
      navigate(ROUTE_PATHS.login);
    }
    handleCloseUserMenu(e);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StoreIcon fontSize="large" sx={{ display: { md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            href="/"
            sx={{
              ml: 2,
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AWESOME INC.
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={(e) => handleNavMenuClick(e, page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User options">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonIcon htmlColor="white" fontSize="large" alt="User" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {accessToken !== null && accessToken !== undefined
                ? loggedInSettings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={(e) => handleUserMenuClick(e, setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))
                : loggedOutSettings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={(e) => handleUserMenuClick(e, setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
