import { FavoriteRounded } from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import ReactTimeAgo from "react-time-ago";
import { commentService } from "../../utils/comments.service";
import "./comments.scss";
type Props = {
  eachCommentId: string;
  commentLikes: any;
  commentId: string;
  comment: string;
  userName: string;
  profileImage: string;
  profileId: string;
  createdAt: any;
  reply?: any;
  replyFocus?: boolean;
  onClickReply?: any;
  renderDuplicate: any;
};

const Comments = (props: Props) => {
  const [reply, setReply] = useState<boolean>(false);
  const userData = useSelector((state: any) => state.userData.user);
  const isLiked: number = props.commentLikes.filter(
    (each: any) => each.id === userData?._id
  ).length;
  const onClickHandleLike = async () => {
    
      await commentService.likeComment(props.eachCommentId);
      props.renderDuplicate();
    
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          p: "13px",
          pb: "0px",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            p: "13px",
            pb: "0px",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Avatar
              alt={props.userName}
              src={props.profileImage || "https://sajsd.com"}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", ml: "20px" }}>
            <Box sx={{ display: "flex", pl: "10px" }}>
              <p className="comment_userName">{props.userName}</p>
              <p className="comment">{props.comment}</p>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Moment className="comment_moment" fromNow>
                {props.createdAt}
              </Moment>
              <p
                className="reply-text"
                onClick={() => {
                  setReply((prev) => !prev);
                  props.onClickReply(props.commentId);
                }}
              >
                Reply
              </p>
            </Box>
          </Box>
        </Box>
        <IconButton aria-label="heart" onClick={onClickHandleLike}>
          <FavoriteRounded
            sx={{
              color: isLiked ? "#EB4D4B" : "#CAD5E2",
            }}
          />
        </IconButton>
        {/* new Date(props.createdAt) */}
      </Box>
      <Box sx={{ pl: "30px" }}>
        {reply && props.reply?.length
          ? props.reply.map((each: any) => {
              return (
                <>
                  <Comments
                    key={each._id}
                    eachCommentId={each.id._id}
                    commentLikes={each.id.likes}
                    commentId={props.commentId}
                    comment={each.id.comment}
                    userName={each.id.createdBy.name}
                    profileImage={each.id.createdBy.image}
                    profileId={each.id.createdBy._id}
                    createdAt={each.id.createdAt}
                    reply={each.reply}
                    replyFocus={props.replyFocus}
                    onClickReply={props.onClickReply}
                    renderDuplicate={props.renderDuplicate}
                  />
                </>
              );
            })
          : ""}
      </Box>
    </>
  );
};

export default Comments;
