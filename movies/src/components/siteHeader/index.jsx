import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [anchorElMovies, setAnchorElMovies] = useState(null);
  const openMovies = Boolean(anchorElMovies);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
  ];

  const moviesMenuOptions = [
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Must Watch", path: "/movies/mustwatch" },
    { label: "Top Rated", path: "/movies/topRated" },
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    setAnchorElMovies(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoviesMenu = (event) => {
    setAnchorElMovies(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {[...menuOptions, ...moviesMenuOptions].map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
                <Button
                  color="inherit"
                  onClick={handleMoviesMenu}
                >
                  Movies
                </Button>
                <Menu
                  anchorEl={anchorElMovies}
                  open={openMovies}
                  onClose={() => setAnchorElMovies(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  {moviesMenuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
