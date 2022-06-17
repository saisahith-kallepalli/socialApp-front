import React, { useEffect, useRef, useState } from "react";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {
  Avatar,
  Button,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import "./savedPostContainer.scss";
import {
  AccountCircle,
  ArrowBackIos,
  ArrowForwardIos,
  Bookmark,
  BookmarkAddOutlined,
  BookmarkBorderOutlined,
  BookmarkBorderSharp,
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteRounded,
  VisibilityOff,
} from "@mui/icons-material";
import Comments from "../comments/Comments";
import { postService } from "../../utils/posts.service";
import Cookies from "js-cookie";
import { commentService } from "../../utils/comments.service";
import Moment from "react-moment";
import { FormControl, Modal } from "react-bootstrap";
import PostPopup from "../Popups/postPopup/postPopup";
import { useSelector } from "react-redux";
type Props = {
  userName: string;
  profileImage: string;
  postImages: Array<string>;
  postCaption: string;
  postId: string;
  profileId: string;
  postLikes: Array<any>;
  setRenderLikes: any;
  createdAt: any;
};

export const SavedPostContainer = (props: Props) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [popup, setPopup] = useState<boolean>(false);
  const [comments, setComments] = useState<Array<any>>([]);
  const [userData, setUserData] = useState<any>({});
  const [indexImage, setIndexImage] = useState<number>(0);
  const [duplicate, setDuplicate] = useState<number>(0);
  const saved = useSelector((state: any) => state.userData.user.saved);
  const isLiked: number = props.postLikes.filter(
    (each) => each.id === userData?._id
  ).length;
  const isSaved: number = saved.filter(
    (each: any) => each.id._id === props.postId
  ).length;
  const onClickShowComments = async () => {
    const comments = await commentService.getComments(props.postId);
    setComments(comments.comments);
  };
  useEffect(() => {
    const userData: any = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    );
    setUserData(userData);
  }, []);
  useEffect(() => {
    onClickShowComments();
  }, [duplicate, popup]);
  const onClickHandleLike = async () => {
    if (isLiked) {
      await postService.disLikePost(props.postId);
      props.setRenderLikes();
    } else {
      await postService.likePost(props.postId);
      props.setRenderLikes();
    }
  };
  const onClickHandleSave = async () => {
    if (isSaved) {
      await postService.unSavePost(props.postId);
      props.setRenderLikes();
    } else {
      await postService.savePost(props.postId);
      props.setRenderLikes();
    }
  };
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (props.postImages.length <= indexImage + 1) {
      setIndexImage(props.postImages.length - 1);
    } else {
      setIndexImage(indexImage + 1);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (indexImage - 1 <= 0) {
      setIndexImage(0);
    } else {
      setIndexImage(indexImage - 1);
    }
  };
  return (
    <div className="container-saved">
      <div className="container-pop-saved" onClick={() => setPopup(true)}>
        {/* <img className="image-posted " src={photo.image[0].url} alt="mine" /> */}
        <div className="imageShow">
          <img
            className="imageEdit2-saved"
            src={props.postImages[indexImage]}
            alt="mine"
          />
          {props.postImages.length > 1 ? (
            <IconButton
              sx={{
                visibility: indexImage >= 1 ? "visible" : "hidden",
              }}
              className="prev-icon-saved"
              onClick={prevImage}
            >
              <ArrowBackIos />
            </IconButton>
          ) : (
            ""
          )}
          {props.postImages.length > 1 ? (
            <IconButton
              sx={{
                visibility:
                  indexImage < props.postImages.length - 1
                    ? "visible"
                    : "hidden",
              }}
              className="next-icon-saved"
              onClick={nextImage}
            >
              <ArrowForwardIos />
            </IconButton>
          ) : (
            ""
          )}
        </div>
      </div>

      <PostPopup
        popup={popup}
        setPopup={setPopup}
        userName={props.userName}
        profileImage={props.profileImage}
        postImages={props.postImages}
        onClickHandleLike={onClickHandleLike}
        isLiked={isLiked}
        setShowComments={setShowComments}
        postCaption={props.postCaption}
        createdAt={props.createdAt}
        postId={props.postId}
        postLikes={props.postLikes}
        setRenderLikes={props.setRenderLikes}
        createdById={props.profileId}
      />
    </div>
  );
};
export default SavedPostContainer;
