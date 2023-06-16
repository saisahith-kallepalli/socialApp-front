import {
  ArrowBackIos,
  ArrowForwardIos,
  Bookmark,
  BookmarkBorderOutlined,
  BookmarkBorderSharp,
  ChatBubbleOutlineOutlined,
  EmojiEmotions,
  FavoriteRounded,
  ModelTraining,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Overlay } from "react-bootstrap";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { commentService } from "../../../utils/comments.service";
import { postService } from "../../../utils/posts.service";
import Comments from "../../comments/Comments";
import "./postPopup.scss";
import Picker from "emoji-picker-react";
import Popup from "reactjs-popup";

type Props = {
  popup: boolean;
  setPopup: any;
  userName: string;
  profileImage: string;
  postImages: Array<string>;
  onClickHandleLike: any;
  isLiked: any;
  setShowComments: any;
  postCaption: string;
  createdAt: any;
  postId: string;
  postLikes: any;
  createdById: string;
  setRenderLikes: any;
  isUserActive: boolean;
};

const PostPopup = (props: Props) => {
  const commentRef: any = useRef();
  const authToken = Cookies.get("_token");
  const token = "Bearer " + authToken;
  const {
    postId,
    popup,
    setPopup,
    userName,
    profileImage,
    postImages,
    onClickHandleLike,
    isLiked,
    setShowComments,
    postCaption,
    createdAt,
    createdById,
    isUserActive,
  } = props;
  const [indexImagePopup, setIndexImagePopup] = useState<number>(0);
  const [duplicate, setDuplicate] = useState<number>(0);
  const [comments, setComments] = useState<Array<any>>([]);
  const [postComment, setPostComment] = useState({ comment: "", focus: false });
  const [commentId, setCommentId] = useState<string>("");
  const [replyFocus, setReplyFocus] = useState<boolean>(false);
  const saved = useSelector((state: any) => state.userData.user.saved);
  const user = useSelector((state: any) => state.userData.user);
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const target = useRef(null);
  const emojisShow = () => {
    setShowEmojis((prev) => !prev);
  };
  const isSaved: number = saved.filter(
    (each: any) => each.id._id === props.postId
  ).length;
  const onClickHandleSave = async () => {
    if (isSaved) {
      await postService.unSavePost(props.postId);
      props.setRenderLikes();
    } else {
      await postService.savePost(props.postId);
      props.setRenderLikes();
    }
  };
  const onClickReply = (id: string) => {
    commentRef.current.focus();
    setReplyFocus(true);
    setCommentId(id);
  };
  const onClickShowComments = async () => {
    const comments = await commentService.getComments(postId);
    setComments(comments.comments);
  };
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
    setShowComments(true);
    setPostComment({ comment: "", focus: false });
    setDuplicate((prev) => prev + 1);
  };
  const onclickReplay = async () => {
    const value = await commentService.replyComment(props.postId, commentId, {
      comment: postComment.comment,
    });
    setReplyFocus(false);
    setShowComments(true);
    setPostComment({ comment: "", focus: false });
    setDuplicate((prev) => prev + 1);
  };
  const nextImagePopup = () => {
    if (postImages.length <= indexImagePopup + 1) {
      setIndexImagePopup(postImages.length - 1);
    } else {
      setIndexImagePopup(indexImagePopup + 1);
    }
  };

  const prevImagePopup = () => {
    if (indexImagePopup - 1 <= 0) {
      setIndexImagePopup(0);
    } else {
      setIndexImagePopup(indexImagePopup - 1);
    }
  };
  return (
    <Modal
      size="xl"
      show={popup}
      onHide={() => setPopup(false)}
      className="body-dec overflow-hidden "
      animation={false}
    >
      <Modal.Body className="d-flex p-0 justify-content-start body-dec bg-white">
        <Box className="p-0 body-dec bg-white">
          <div className="imageShowPopup">
            <img
              className="imageEditPopup "
              src={postImages[indexImagePopup]}
              alt="mine"
            />
            {postImages.length > 1 ? (
              <IconButton
                sx={{
                  visibility: indexImagePopup >= 1 ? "visible" : "hidden",
                }}
                className="prev-icon"
                onClick={prevImagePopup}
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
                    indexImagePopup < props.postImages.length - 1
                      ? "visible"
                      : "hidden",
                }}
                className="next-icon"
                onClick={nextImagePopup}
              >
                <ArrowForwardIos />
              </IconButton>
            ) : (
              ""
            )}
          </div>
        </Box>
        <Box className="body-dec hideOver">
          <Box
            sx={{
              // position: "fixed",
              // zIndex: "500",
              backgroundColor: "#ffffff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: "10px",
                pb: "0px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  p: "0px",
                }}
              >
                <Box sx={{ border: "2px solid #ffffff", borderRadius: "50px" }}>
                  {isUserActive ? (
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "top", horizontal: "left" }}
                      variant="dot"
                      color="success"
                    >
                      <Avatar
                        alt={userName}
                        src={profileImage || "https://sajsd.com"}
                      />
                    </Badge>
                  ) : (
                    <Avatar
                      alt={userName}
                      src={profileImage || "https://sajsd.com"}
                    />
                  )}
                </Box>
                <label className="userName">{userName}</label>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: "20px",
                width: "100%",
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
                    setReplyFocus(false);
                  }}
                >
                  <ChatBubbleOutlineOutlined />
                </IconButton>
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
            <Moment className="moment-edit" fromNow>
              {props.createdAt}
            </Moment>

            <Box
              className="comments-scroll"
              sx={{
                height: "30vh",
                overflowY: "scroll",
                marginBottom: "30px",
              }}
            >
              {showEmojis && (
                <Box sx={{ zIndex: "500" }}>
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
              )}
              {comments.length
                ? comments.map((each) => {
                    return (
                      <Comments
                        eachCommentId={each._id}
                        commentLikes={each.likes}
                        key={each._id}
                        commentId={each._id}
                        comment={each.comment}
                        userName={each?.createdBy?.name}
                        profileImage={each?.createdBy?.image}
                        profileId={each?.createdBy?._id}
                        createdAt={each.createdAt}
                        reply={each.reply}
                        replyFocus={replyFocus}
                        onClickReply={onClickReply}
                        renderDuplicate={renderDuplicate}
                      />
                    );
                  })
                : ""}
            </Box>
          </Box>

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
              setPostComment((prev) => ({
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
                <InputAdornment
                  ref={target}
                  position="start"
                  onClick={emojisShow}
                >
                  <IconButton>
                    <EmojiEmotions />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Modal.Body>
    </Modal>
  );
};
export default PostPopup;
