import React, { useEffect, useState } from "react";
import "./Profile.scss"; // Import the SCSS file for styling
import { useParams } from "react-router";
import { profileService } from "../../utils/profile.service";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { GridOn, BookmarkSharp, Send } from "@mui/icons-material";
// import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import SavedPostContainer from "../savedPostContainer/savedPostContainer";
import { postService } from "../../utils/posts.service";
import { savedPosts } from "../../redux/reducers";
import { io } from "socket.io-client";
import Cookies from "js-cookie";

const Profile = () => {
  const { id } = useParams<any>();
  const authToken = Cookies.get("_token");

  const [userDetails, setUserDetails] = useState<any>({});
  const { user } = useSelector((state: any) => state.userData);
  const [like, setLike] = useState<boolean>(false);
  const [showPost, setShowPost] = useState<boolean>(true);
  const [socket, setSocket] = useState<any>();
  const newPost = useSelector((state: any) => state.postsData.newPost);

  const setRenderLikes = () => {
    setLike((pre) => !pre);
    
  };
  useEffect(() => {
    fetchUser();
  }, [like]);
  const fetchUser = async () => {
    const details: any = await profileService.getUserDetails(id);
    console.log(details, "details");
    setUserDetails({
      ...details,
      posts: details?.posts.map((post: any) => ({
        id: post,
      })),
    });
  };
  console.log(userDetails?.posts, "userDetails");
  useEffect(() => {
    // const token = "Bearer " + authToken;
    let token = authToken;
    console.log(token);
    const socket = io("http://localhost:8080/chat", {
      auth: { token },
    });
    socket.on("connect", () => {
      console.log("connected");
    });
    setSocket(socket);
  }, []);
  const onclickMessage = () => {
    console.log("joinChat");
    socket.emit("joinChat", { personId: userDetails?.user._id });
  };
  return (
    <>
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
                userDetails?.user?.firstName +
                  "_" +
                  userDetails?.user?.lastName}
            </h2>
            <p className="bio">{userDetails?.user?.bio}</p>
          </div>
          <Button
            variant="outlined"
            className="message-btn"
            onClick={onclickMessage}
            endIcon={<Send />}>
            Message
          </Button>
        </div>
      </div>
      <div className="profile-posts">
        <div
          className={`post ${showPost ? "profile-select" : ""}`}
          onClick={() => setShowPost(true)}>
          <GridOn />
          <Typography sx={{ fontWeight: "bold" }}>Posts</Typography>
        </div>
        {user?._id === id && (
          <div
            className={`post ${!showPost ? "profile-select" : ""}`}
            onClick={() => setShowPost(false)}>
            <BookmarkSharp />
            <Typography sx={{ fontWeight: "bold" }}>Saved</Typography>
          </div>
        )}
      </div>
      <Container className="post-container">
        {showPost ? (
          <Box
            sx={{
              width: "80vw",
              ml: "8%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}>
            {userDetails?.posts
              ?.sort(
                (a: any, b: any) =>
                  new Date(b.id.updatedAt).getTime() -
                  new Date(a.id.updatedAt).getTime()
              )
              ?.map((each: any) => {
                console.log(each);
                return (
                  <SavedPostContainer
                    key={each.id._id}
                    userName={each.id.createdBy.name}
                    profileImage={each.id.createdBy.image}
                    postImages={each.id.image}
                    postId={each.id._id}
                    postCaption={each.id.caption}
                    profileId={each.id.createdBy._id}
                    postLikes={each.id.likes}
                    createdAt={each.id.createdAt}
                    setRenderLikes={setRenderLikes}
                  />
                );
              })}
          </Box>
        ) : (
          <Box
            sx={{
              width: "80vw",
              ml: "8%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}>
            {userDetails.user?.saved
              ?.sort(
                (a: any, b: any) =>
                  new Date(a.id.updatedAt).getTime() -
                  new Date(b.id.updatedAt).getTime()
              )
              ?.map((each: any) => {
                console.log(each);
                return (
                  <SavedPostContainer
                    key={each.id._id}
                    userName={each.id.createdBy.name}
                    profileImage={each.id.createdBy.image}
                    postImages={each.id.image}
                    postId={each.id._id}
                    postCaption={each.id.caption}
                    profileId={each.id.createdBy._id}
                    postLikes={each.id.likes}
                    createdAt={each.id.createdAt}
                    setRenderLikes={setRenderLikes}
                  />
                );
              })}
          </Box>
        )}
      </Container>
    </>
  );
};

export default Profile;
