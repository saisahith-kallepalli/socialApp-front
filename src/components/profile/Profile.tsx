import React, { useEffect, useState } from "react";
import "./Profile.scss"; // Import the SCSS file for styling
import { useParams } from "react-router";
import { profileService } from "../../utils/profile.service";
import { Avatar, Divider, Typography } from "@mui/material";
import GridOnIcon from "@mui/icons-material/GridOn";

const Profile = () => {
  const { id } = useParams<any>();
  const [userDetails, setUserDetails] = useState<any>({});
  console.log(id);
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    const details = await profileService.getUserDetails(id);
    setUserDetails(details);
  };
  console.log(userDetails);
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture">
          <Avatar
            className="profile-image"
            src={userDetails?.user?.image}
            alt={
              userDetails?.user?.firstName + " " + userDetails?.user?.lastName
            }
          />
        </div>
        <div className="profile-info">
          <h2>
            {userDetails?.user?.name ||
              userDetails?.user?.firstName + "_" + userDetails?.user?.lastName}
          </h2>
          <p className="bio">{userDetails?.user?.bio}</p>
        </div>
      </div>
      <Divider />
      <div className="profile-posts">
        <div className="post">
          <GridOnIcon />
          <Typography sx={{ fontWeight: "bold" }}>Posts</Typography>
        </div>

        {/* Add more posts as needed */}
      </div>
    </div>
  );
};

export default Profile;
