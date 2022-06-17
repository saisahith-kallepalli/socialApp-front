import { AddAPhotoRounded } from "@mui/icons-material";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  Avatar,
  Badge,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import Cookies from "js-cookie";
import MuiPhoneNumber from "material-ui-phone-number";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDataChange } from "../../../redux/reducers";
import { authenticationService } from "../../../utils/auth.service";
import { profileService } from "../../../utils/profile.service";
import "./editProfile.scss";
type Props = {};

const EditProfile = (props: Props) => {
  const authToken = Cookies.get("_token");
  const token = "Bearer " + authToken;
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.userData.user);
  const userDetails = {
    name: user.name,
    email: user.email,
    bio: user.bio || "",
    gender: user.gender || "",
    dateOfBirth: user.dateOfBirth || "",
    mobile: user.mobile || "",
  };
  const [userData, setUserData] = useState<any>(userDetails);
  const [imageUrls, setImageUrls] = useState<Array<any>>([]);
  const onChangeImage = (e: React.ChangeEvent<any>) => {
    e.stopPropagation();
    setImageUrls([e.target.files[0]]);
  };
  const uploadImage = async () => {
    const data = new FormData();
    data.append("image", imageUrls[0]);
    await profileService.updateProfileImage(data);
    await fetchUser();
    setImageUrls([]);
  };
  const removeImage = async () => {
    await profileService.removeProfileImage();
    await fetchUser();
    setImageUrls([]);
  };

  const updateProfile = async () => {
    await profileService.updateProfileDetails({
      ...userData,
      mobile: userData.mobile.replace(/[(,[,),_," ",{,},-]/g, ""),
    });
    await fetchUser();
  };
  const fetchUser = async () => {
    const userDetails = await authenticationService.loadCurrentUser(token);
    dispatch(userDataChange(userDetails));
  };
  return (
    <Box>
      <Box className="edit-upload-container">
        <Badge
          badgeContent={
            <label htmlFor="contained-button-file">
              <IconButton component="span">
                <AddAPhotoRounded color="primary" />
              </IconButton>
            </label>
          }
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          overlap="circular"
        >
          <Avatar
            alt={user.name}
            src={
              imageUrls.length
                ? (window.URL || window.webkitURL).createObjectURL(imageUrls[0])
                : user.image
                ? user.image
                : "https://sajsd.com"
            }
            sx={{ height: "100px", width: "100px" }}
          />
        </Badge>
        <input
          title="upload"
          id="contained-button-file"
          type="file"
          className="input_disable"
          onChange={onChangeImage}
        />
        <Box>
          {imageUrls.length ? (
            <Button onClick={() => setImageUrls([])}>Remove</Button>
          ) : (
            <Button onClick={removeImage}>Remove</Button>
          )}
          {imageUrls.length ? (
            <Button onClick={uploadImage}>Upload</Button>
          ) : (
            ""
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
        <TextField
          id="outlined-basic"
          label="name"
          variant="outlined"
          sx={{ mb: "10px" }}
          value={userData.name}
          onChange={(e: React.ChangeEvent<any>) => {
            setUserData((prev: any) => ({ ...prev, name: e.target.value }));
          }}
        />
        <TextField
          id="outlined-basic"
          label="email"
          variant="outlined"
          sx={{ mb: "10px" }}
          value={userData.email}
          onChange={(e: React.ChangeEvent<any>) => {
            setUserData((prev: any) => ({ ...prev, email: e.target.value }));
          }}
        />
        <TextField
          id="outlined-basic"
          label="Bio"
          variant="outlined"
          sx={{ mb: "10px" }}
          multiline
          rows={5}
          value={userData.bio}
          onChange={(e: React.ChangeEvent<any>) => {
            setUserData((prev: any) => ({ ...prev, bio: e.target.value }));
          }}
        />
        <FormControl sx={{ mb: "10px" }}>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={userData.gender}
            onChange={(e: React.ChangeEvent<any>) => {
              setUserData((prev: any) => ({ ...prev, gender: e.target.value }));
            }}
          >
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="Others"
              control={<Radio />}
              label="Others"
            />
          </RadioGroup>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <FormLabel sx={{ pb: 2 }}>Date Of Birth</FormLabel>
          <DesktopDatePicker
            label="Date Of Birth"
            inputFormat="MM/DD/yyyy"
            value={userData.dateOfBirth}
            onChange={(value: Date | null) => {
              setUserData((prev: any) => ({ ...prev, dateOfBirth: value }));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <FormControl sx={{ mb: "10px" }}>
          <FormLabel sx={{ pb: 2 }}>Mobile Number</FormLabel>
          <MuiPhoneNumber
            defaultCountry="in"
            variant="outlined"
            name="mobile number"
            label="mobile number"
            value={userData.mobile}
            onChange={(value: any) => {
              if (value) {
                setUserData((prev: any) => ({
                  ...prev,
                  mobile: value,
                }));
              }
            }}
          />
        </FormControl>
        <Button variant="contained" onClick={updateProfile}>
          Save Profile
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfile;
