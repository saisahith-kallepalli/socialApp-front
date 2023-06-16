import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";

// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import "./postContainer.scss";
import {
  AccountCircle,
  ArrowBackIos,
  ArrowForwardIos,
  Bookmark,
  BookmarkAddOutlined,
  BookmarkBorderOutlined,
  BookmarkBorderSharp,
  ChatBubbleOutlineOutlined,
  EmojiEmotions,
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
import Popup from "reactjs-popup";
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
  createdById: string;
  isUserActive: boolean;
};

export const PostContainer = (props: Props) => {
  const commentRef: any = useRef();
  const [showComments, setShowComments] = useState<boolean>(false);
  const [popup, setPopup] = useState<boolean>(false);
  const [comments, setComments] = useState<Array<any>>([]);
  const [userData, setUserData] = useState<any>({});
  const [indexImage, setIndexImage] = useState<number>(0);
  const [duplicate, setDuplicate] = useState<number>(0);
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const emojisShow = () => {
    setShowEmojis((prev) => !prev);
  };
  const [postComment, setPostComment] = useState<any>({
    comment: "",
    focus: false,
  });
  const [commentId, setCommentId] = useState<string>("");
  const [replyFocus, setReplyFocus] = useState<boolean>(false);
  const userId = useSelector((state: any) => state.userData.user._id);
  const onClickReply = (id: string) => {
    commentRef.current.focus();
    setReplyFocus(true);
    setCommentId(id);
    
  };
  const saved = useSelector((state: any) => state.userData.user.saved);
  const isLiked: number = props.postLikes.filter(
    (each) => each.id=== userId
  ).length;
  console.log(props.postLikes,"====>",userId,isLiked);
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
  const renderDuplicate = () => {
    setDuplicate((prev) => prev + 1);
  };

  const onclickComment = async () => {
    const value = await commentService.postComment(props.postId, {
      comment: postComment.comment,
    });
    setReplyFocus(false);
    setShowComments(true);
    setPostComment({ comment: "" });
    setDuplicate((prev) => prev + 1);
  };

  const onclickReplay = async () => {
    const value = await commentService.replyComment(props.postId, commentId, {
      comment: postComment.comment,
    });
    setReplyFocus(false);
    setShowComments(true);
    setPostComment({ comment: "" });
    setDuplicate((prev) => prev + 1);
  };
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
  const nextImage = () => {
    if (props.postImages.length <= indexImage + 1) {
      setIndexImage(props.postImages.length - 1);
    } else {
      setIndexImage(indexImage + 1);
    }
  };

  const prevImage = () => {
    if (indexImage - 1 <= 0) {
      setIndexImage(0);
    } else {
      setIndexImage(indexImage - 1);
    }
  };
  return (
    <div className="container">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: "10px",
          pb: "0px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          {props.isUserActive ? (
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              variant="dot"
              color="success"
            >
              <Avatar
                alt={props.userName}
                src={props.profileImage || "https://sajsd.com"}
              />
            </Badge>
          ) : (
            <Avatar
              alt={props.userName}
              src={props.profileImage || "https://sajsd.com"}
            />
          )}

          <label className="userName">{props.userName}</label>
        </Box>
      </Box>
      <div className="container-pop">
        {/* <img className="image-posted " src={photo.image[0].url} alt="mine" /> */}
        <div className="imageShow">
          <img
            className="imageEdit2"
            src={props.postImages[indexImage]}
            alt="mine"
          />
          {props.postImages.length > 1 ? (
            <IconButton
              sx={{
                visibility: indexImage >= 1 ? "visible" : "hidden",
              }}
              className="prev-icon"
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
              className="next-icon"
              onClick={nextImage}
            >
              <ArrowForwardIos />
            </IconButton>
          ) : (
            ""
          )}
        </div>
      </div>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
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
            {props.postLikes.length ? (
              <p className="likes-text">
                {props.postLikes.length}
                {props.postLikes.length > 1 ? " likes" : " like"}
              </p>
            ) : (
              ""
            )}
          </Box>
          <Box>
            <IconButton
              aria-label="comments"
              onClick={() => {
                setPopup(true);
                setReplyFocus(false);
              }}
            >
              <ChatBubbleOutlineOutlined />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <IconButton aria-label="save" onClick={onClickHandleSave}>
            {isSaved ? <Bookmark /> : <BookmarkBorderOutlined />}
          </IconButton>
        </Box>
      </Box>
      {props.postCaption && (
        <Box sx={{ display: "flex", pl: "10px" }}>
          <p className="userNameCaption">{props.userName}</p>
          <p className="caption">{props.postCaption}</p>
        </Box>
      )}
      <p
        className="viewAll-comments"
        onClick={() => {
          setPopup((prev) => !prev);
        }}
      >
        view all comments
      </p>
      <Moment className="moment-edit" fromNow>
        {props.createdAt}
      </Moment>
      <div>
        {showComments
          ? comments.map((each) => {
              return (
                <Comments
                  key={each._id}
                  eachCommentId={each._id}
                  commentLikes={each.likes}
                  commentId={each._id}
                  comment={each.comment}
                  userName={each.createdBy.name}
                  profileImage={each.createdBy.image}
                  profileId={each.createdBy._id}
                  createdAt={each.createdAt}
                  reply={each.reply}
                  replyFocus={replyFocus}
                  onClickReply={onClickReply}
                  renderDuplicate={renderDuplicate}
                />
              );
            })
          : ""}
        <TextField
          label={replyFocus ? "reply" : "comment"}
          placeholder={
            replyFocus ? "write reply...." : "Write Comment.........."
          }
          sx={{
            pb: "15px",
            pl: "5px",
            pr: "5px",
            mt: "5px",
            width: "100%",
          }}
          inputRef={commentRef}
          value={postComment.comment}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPostComment((prev: any) => ({
              ...prev,
              comment: e.target.value,
            }));
          }}
          id="comment"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {replyFocus ? (
                  <Button onClick={onclickReplay}>Reply</Button>
                ) : (
                  <Button onClick={onclickComment}>comment</Button>
                )}
              </InputAdornment>
            ),
            startAdornment: (
              <Popup
                trigger={(showEmojis) => (
                  <InputAdornment position="start" onClick={emojisShow}>
                    <IconButton>
                      <EmojiEmotions />
                    </IconButton>
                  </InputAdornment>
                )}
                position="top left"
              >
                <Box>
                  <Picker
                    disableSearchBar={true}
                    onEmojiClick={(e: any, emoji: any) =>
                      setPostComment((prev: any) => ({
                        ...prev,
                        comment: prev.comment + emoji.emoji,
                      }))
                    }
                  />
                </Box>
              </Popup>
            ),
          }}
        />
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
        createdById={props.createdById}
        isUserActive={props.isUserActive}
      />
    </div>
  );
};
// export default PostContainer;
