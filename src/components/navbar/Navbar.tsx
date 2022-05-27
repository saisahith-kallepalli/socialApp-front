import React from "react";
import "./Navbar.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import { AddBoxOutlined, Logout } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { Button, Popper } from "@mui/material";
import ImageUpload from "../Popups/uploadImage/ImageUpload";
import Popup from "reactjs-popup";

export type NavbarProps = {
  /**
   * To be triggered on logout click
   */
  onLogout?: any;
};

export const Navbar = ({ onLogout }: NavbarProps) => {
  const [close, setClose] = React.useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setClose((prev) => !prev);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#ffffff" }}>
      <Toolbar variant="dense">
        {/* 
          <MenuIcon />
         */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <img
            src="https://res.cloudinary.com/sahith/image/upload/v1653291009/Icon_1_nfizmp.png"
            alt="icon"
            className="icon-config"
          />
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            style={{ flex: 1, color: "#000000" }}
          >
            Social Feed
          </Typography>
        </IconButton>

        <Popup
          trigger={
            <IconButton aria-describedby={"me"} onClick={handleClick}>
              <AddBoxOutlined />
            </IconButton>
          }
          modal
          nested
        >
          <ImageUpload />
        </Popup>
        <Tooltip title="Logout">
          <Button
            variant="text"
            style={{ color: "#000000", marginLeft: "auto" }}
            onClick={onLogout}
          >
            <Logout />
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
