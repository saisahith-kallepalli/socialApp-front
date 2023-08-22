import React, { useEffect, useState } from "react";
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
  Search,
  Visibility,
} from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Fade,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  OutlinedInput,
  Popper,
  TextField,
} from "@mui/material";
import ImageUpload from "../Popups/uploadImage/ImageUpload";
import Popup from "reactjs-popup";
import { Box, styled } from "@mui/system";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { authenticationService } from "../../utils/auth.service";
import { Modal } from "react-bootstrap";
import EditProfile from "../Popups/edit-profile/editProfile";
import { profileService } from "../../utils/profile.service";

export type NavbarProps = {
  /**
   * To be triggered on logout click
   */
  onLogout?: any;
};

export const Navbar = ({ onLogout }: NavbarProps) => {
  const [close, setClose] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState<string>("");
  const [userData, setUserData] = useState<any>([]);
  const onClickProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
  const onChangeSearch = (event: React.FormEvent<HTMLInputElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const onChangeSearchUsers = async () => {
    const data: any = await profileService.searchUsers(search);
    const results = data.results.map((each: any) => {
      return {
        _id: each._id,
        name: each.name,
        email: each.email,
        firstName: each.firstName,
        lastName: each.lastName,
        image: each.image,
      };
    });
    setUserData(results);
  };
  useEffect(() => {
    if (search) {
      onChangeSearchUsers();
      setOpen2(true);
    } else {
      setOpen2(false);
    }
  }, [search]);
  const canBeOpen = open && Boolean(anchorEl);
  const profilePopperID = canBeOpen ? "spring-popper" : undefined;

  const imagePopper = (event: React.MouseEvent<HTMLElement>) => {
    setClose((prev) => !prev);
  };
  const listOfProfiles = () => {
    return (
      <div>
        <List
          sx={{
            width: "440px",
            bgcolor: "background.paper",
            margin: "1px 0 0 30px",
            borderRadius: "5px",
            border: "1px solid grey",
          }}>
          {userData.length ? (
            userData.map((each: any) => {
              return (
                <ListItem
                  alignItems="flex-start"
                  key={each._id}
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    authenticationService.redirectToProfilePage({
                      id: each._id,
                    })
                  }>
                  <ListItemAvatar>
                    <Avatar alt={each.name} src={each.image} />
                  </ListItemAvatar>
                  <ListItemText
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary">
                          {each.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom>
                          {each.firstName + "_" + each.lastName}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Divider />
                </ListItem>
              );
            })
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="h6"
                color="text.primary">
                No User
              </Typography>
            </Box>
          )}
        </List>
      </div>
    );
  };
  const user = useSelector((state: any) => state.userData.user);
  return (
    <AppBar
      sx={{
        position: "fixed",
        width: "100vw",
        display: "flex",
        backgroundColor: "#ffffff",
        top: 0,
        zIndex: 99,
      }}>
      <Toolbar
        variant="dense"
        sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}>
          <img
            src="https://res.cloudinary.com/sahith/image/upload/v1654756082/Logo_hr2fsm.png"
            alt="icon"
            className="icon-config"
          />
        </IconButton>
        <Box>
          <Input
            disableUnderline
            onChange={(event: any) => {
              console.log(event.target.value);
              onChangeSearch(event);
            }}
            onChangeCapture={(e: any) => {
              console.log(e.target.value);
              setSearch(e.target.value);
            }}
            sx={{
              outline: "none",
              width: "440px",
              padding: "0px 10px ",
              border: "1px solid #000000",
              borderRadius: "10px",
            }}
            id="outlined-adornment-password"
            // type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                  <Search />
                </IconButton>
              </InputAdornment>
            }
            // label="Password"
          />
          <Popper
            placement="bottom"
            disablePortal={true}
            id={profilePopperID}
            open={open2}
            anchorEl={anchorEl2}
            transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps}>{listOfProfiles()}</Fade>
            )}
          </Popper>
        </Box>
        <Box>
          <Tooltip
            title="home"
            onClick={authenticationService.redirectToHomePage}>
            <IconButton sx={{ color: "#000000", marginLeft: "auto" }}>
              <Home />
            </IconButton>
          </Tooltip>
          <Popup
            trigger={
              <Tooltip title="new post" onClick={imagePopper}>
                <IconButton
                  sx={{ color: "#000000", marginLeft: "auto" }}
                  aria-describedby={"me"}>
                  <AddAPhotoOutlined />
                </IconButton>
              </Tooltip>
            }
            modal
            nested>
            <ImageUpload />
          </Popup>

          <Tooltip
            title="saved"
            onClick={authenticationService.redirectToSavedPage}>
            <IconButton sx={{ color: "#000000", marginLeft: "auto" }}>
              <BookmarkBorder />
            </IconButton>
          </Tooltip>
          <IconButton onClick={onClickProfile}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              variant="dot"
              color="success">
              <Avatar alt={user.name} src={user.image || "https://sajsd.com"} />
            </Badge>
            <label className="userNameNav">{user.name}</label>
          </IconButton>

          <Popper
            placement="top"
            disablePortal={true}
            id={profilePopperID}
            open={open}
            anchorEl={anchorEl}
            transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps}>
                <Box className="profilePopper">
                  <IconButton
                    onClick={() => {
                      setOpenProfile(true);
                      setOpen(false);
                    }}>
                    <ManageAccounts />
                    <label className="popupNames">profile</label>
                  </IconButton>
                  <IconButton>
                    <LockReset />
                    <label className="popupNames">change password</label>
                  </IconButton>
                  <IconButton onClick={onLogout}>
                    <Logout />
                    <label className="popupNames">logout</label>
                  </IconButton>
                </Box>
              </Fade>
            )}
          </Popper>
          <Modal
            show={openProfile}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={() => setOpenProfile(false)}>
            <Modal.Header closeButton>
              <div className="mx-auto ps-5">
                <h4 className="ps-5">Profile Update</h4>
              </div>
            </Modal.Header>
            <EditProfile />
          </Modal>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
