import React from "react";
import history from "../../routes/history";
import "./Navbar.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import {
  AddAPhotoOutlined,
  AddBoxOutlined,
  BookmarkBorder,
  BookmarkOutlined,
  Home,
  Label,
  LockReset,
  Logout,
  ManageAccounts,
} from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { Avatar, Button, Fade, Popper } from "@mui/material";
import ImageUpload from "../Popups/uploadImage/ImageUpload";
import Popup from "reactjs-popup";
import { Box } from "@mui/system";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { authenticationService } from "../../utils/auth.service";

export type NavbarProps = {
  /**
   * To be triggered on logout click
   */
  onLogout?: any;
};

export const Navbar = ({ onLogout }: NavbarProps) => {
  const [close, setClose] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const onClickProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const profilePopperID = canBeOpen ? "spring-popper" : undefined;

  const imagePopper = (event: React.MouseEvent<HTMLElement>) => {
    setClose((prev) => !prev);
  };
  const user = useSelector((state: any) => state.userData.user)
  return (
    <AppBar
      sx={{
        position: "fixed",
        width: "100vw",
        display: "flex",
        backgroundColor: "#ffffff",
        top: 0,
        zIndex: 99,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
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
        <Box>
          <Tooltip
            title="home"
            onClick={authenticationService.redirectToHomePage}
          >
            <IconButton sx={{ color: "#000000", marginLeft: "auto" }}>
              <Home />
            </IconButton>
          </Tooltip>
          <Popup
            trigger={
              <Tooltip title="new post" onClick={imagePopper}>
                <IconButton
                  sx={{ color: "#000000", marginLeft: "auto" }}
                  aria-describedby={"me"}
                >
                  <AddAPhotoOutlined />
                </IconButton>
              </Tooltip>
            }
            modal
            nested
          >
            <ImageUpload />
          </Popup>

          <Tooltip
            title="saved"
            onClick={authenticationService.redirectToSavedPage}
          >
            <IconButton sx={{ color: "#000000", marginLeft: "auto" }}>
              <BookmarkBorder />
            </IconButton>
          </Tooltip>
          <IconButton onClick={onClickProfile}>
            <Avatar alt={user.name} src={user.image || "https://sajsd.com"} />
            <label className="userNameNav">{user.name}</label>
          </IconButton>
          {/* <Box sx={{ border: "2px solid #ffffff", borderRadius: "50px" }}>
            
            <label className="userName">{user.name}</label>
          </Box> */}
          {/* <Tooltip title="Logout">
            <Button
              variant="text"
              style={{ color: "#000000", marginLeft: "auto" }}
              onClick={onLogout}
            >
              <Logout />
            </Button>
          </Tooltip> */}
          <Popper
            placement="bottom-end"
            disablePortal={true}
            id={profilePopperID}
            open={open}
            anchorEl={anchorEl}
            transition
            modifiers={[
              {
                name: "flip",
                enabled: true,
                options: {
                  altBoundary: true,
                  rootBoundary: "document",
                  padding: 8,
                },
              },
              {
                name: "preventOverflow",
                enabled: true,
                options: {
                  altAxis: true,
                  altBoundary: true,
                  tether: true,
                  rootBoundary: "viewport",
                  padding: 8,
                },
              },
            ]}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps}>
                <Box className="profilePopper">
                  <Button>
                    <IconButton>
                      <ManageAccounts />
                      <label className="popupNames">profile</label>
                    </IconButton>
                  </Button>
                  <Button>
                    <IconButton>
                      <LockReset />
                      <label className="popupNames">change password</label>
                    </IconButton>
                  </Button>
                  <Button>
                    <IconButton onClick={onLogout}>
                      <Logout />
                      <label className="popupNames">logout</label>
                    </IconButton>
                  </Button>
                </Box>
              </Fade>
            )}
          </Popper>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
