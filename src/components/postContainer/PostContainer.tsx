import React, { useEffect, useState } from "react";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Avatar, IconButton } from "@mui/material";
import { Box, Container } from "@mui/system";
import "./postContainer.scss";
import {
  BookmarkAddOutlined,
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteRounded,
} from "@mui/icons-material";
import Comments from "../comments/Comments";
import { postService } from "../../utils/posts.service";
import Cookies from "js-cookie";
import { commentService } from "../../utils/comments.service";
import { profile } from "console";
type Props = {
  userName: string;
  profileImage: string;
  postImages: Array<string>;
  postCaption: string;
  postId: string;
  profileId: string;
  postLikes: Array<any>;
  setRenderLikes: any;
};

export const PostContainer = (props: Props) => {
  const authToken = Cookies.get("_token");
  const token = "Bearer " + authToken;
  const [showComments, setShowComments] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<Array<any>>([]);
  const [userData, setUserData] = useState<any>({});
  const isLiked: number = props.postLikes.filter(
    (each) => each.id === userData?._id
  ).length;
  const onClickShowComments = async () => {
    const comments = await commentService.getComments(props.postId, token);
    setComments(comments.comments);
    setShowComments((prev) => !prev);
    console.log(userData);
  };
  useEffect(() => {
    const userData: any = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    );
    setUserData(userData);
  }, []);
  const onClickHandleLike = async () => {
    if (isLiked) {
      await postService.disLikePost(props.postId, token);
      props.setRenderLikes();
      console.log("first");
    } else {
      await postService.likePost(props.postId, token);
      props.setRenderLikes();
      console.log("second");
    }
  };
  return (
    <div className="container">
      <Box sx={{ display: "flex", p: "10px" }}>
        <Avatar
          alt={props.userName}
          src={props.profileImage || "https://sajsd.com"}
        />
        <label className="userName">{props.userName}</label>
      </Box>
      <img
        src={props.postImages[0]}
        alt={props.postCaption || "postImage"}
        className="imageEdit"
      />
      <Box
        sx={{
          display: "flex",
          margin: "10px",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <IconButton aria-label="heart" onClick={onClickHandleLike}>
            <FavoriteRounded
              sx={{
                color: isLiked ? "#EB4D4B" : "#CAD5E2",
              }}
            />
          </IconButton>
          <IconButton aria-label="comments" onClick={onClickShowComments}>
            <ChatBubbleOutlineOutlined />
          </IconButton>
        </Box>
        <Box>
          <IconButton aria-label="save">
            <BookmarkAddOutlined sx={{}} />
          </IconButton>
        </Box>
      </Box>
      <div>
        {showComments &&
          comments.map((each) => {
            return (
              <Comments
                key={each._id}
                commentId={each._id}
                comment={each.comment}
                userName={each.createdBy.name}
                profileImage={each.createdBy.image}
                profileId={each.createdBy._id}
              />
            );
          })}
      </div>
    </div>
  );
};
// export default PostContainer;
