import {
  ArrowBackIos,
  ArrowForwardIos,
  BookmarkBorderSharp,
  ChatBubbleOutlineOutlined,
  FavoriteRounded,
  ModelTraining,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { commentService } from "../../../utils/comments.service";
import Comments from "../../comments/Comments";
import "./postPopup.scss";
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
  } = props;
  const [indexImagePopup, setIndexImagePopup] = useState<number>(0);
  const [duplicate, setDuplicate] = useState<number>(0);
  const [comments, setComments] = useState<Array<any>>([]);
  const [postComment, setPostComment] = useState({ comment: "", focus: false });
  const [commentId, setCommentId] = useState<string>("");
  const [replyFocus, setReplyFocus] = useState<boolean>(false);
  const onClickReply = (id: string) => {
    commentRef.current.focus();
    setReplyFocus(true);
    setCommentId(id);
  };
  const onClickShowComments = async () => {
    const comments = await commentService.getComments(postId, token);
    setComments(comments.comments);
  };
  useEffect(() => {
    onClickShowComments();
  }, [duplicate]);
  const onclickComment = async () => {
    const value = await commentService.postComment(props.postId, token, {
      comment: postComment.comment,
    });
    setShowComments(true);
    setPostComment({ comment: "", focus: false });
    console.log(value);
    setDuplicate((prev) => prev + 1);
  };
  const onclickReplay = async () => {
    const value = await commentService.replyComment(
      props.postId,
      commentId,
      token,
      {
        comment: postComment.comment,
      }
    );
    setReplyFocus(false);
    setShowComments(true);
    setPostComment({ comment: "", focus: false });
    console.log(value);
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
      size="lg"
      show={popup}
      onHide={() => setPopup(false)}
      className="body-dec overflow-hidden "
      animation={false}
    >
      <Modal.Body className="d-flex p-0 justify-content-start body-dec bg-white">
        <Modal.Body className="p-0 body-dec bg-white">
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
        </Modal.Body>
        <Modal.Body className="body-dec hideOver">
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
                <Box className="avatar-image-popup">
                  <Box
                    sx={{ border: "2px solid #ffffff", borderRadius: "50px" }}
                  >
                    <Avatar
                      alt={userName}
                      src={profileImage || "https://sajsd.com"}
                    />
                  </Box>
                </Box>
                <label className="userName">{userName}</label>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: "20px",
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
              </Box>
              <IconButton
                aria-label="comments"
                onClick={() => {
                  setReplyFocus(false);
                }}
              >
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Box>
                <IconButton aria-label="save">
                  <BookmarkBorderSharp />
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
              {comments.length
                ? comments.map((each) => {
                    return (
                      <Comments
                        key={each._id}
                        commentId={each._id}
                        comment={each.comment}
                        userName={each.createdBy.name}
                        profileImage={each.createdBy.image}
                        profileId={each.createdBy._id}
                        createdAt={each.createdAt}
                        reply={each.reply}
                        replyFocus={replyFocus}
                        onClickReply={onClickReply}
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
            }}
          />
        </Modal.Body>
      </Modal.Body>
    </Modal>
  );
};
export default PostPopup;
