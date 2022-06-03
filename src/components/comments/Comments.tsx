import { Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Moment from "react-moment";
import ReactTimeAgo from "react-time-ago";
import "./comments.scss";
type Props = {
  commentId: string;
  comment: string;
  userName: string;
  profileImage: string;
  profileId: string;
  createdAt: any;
  reply?: any;
  replyFocus?: boolean;
  onClickReply?: any;
};

const Comments = (props: Props) => {
  console.log(new Date(props.createdAt).getTime());
  const [reply, setReply] = useState<boolean>(false);
  return (
    <>
      <Box sx={{ display: "flex", p: "13px" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Avatar
            alt={props.userName}
            src={props.profileImage || "https://sajsd.com"}
          />
          <Moment className="comment_moment" fromNow>
            {props.createdAt}
          </Moment>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", pl: "10px" }}>
            <p className="comment_userName">{props.userName}</p>
            <p className="comment">{props.comment}</p>
          </Box>

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

        {/* new Date(props.createdAt) */}
      </Box>
      <Box sx={{ pl: "30px" }}>
        {reply && props.reply?.length
          ? props.reply.map((each: any) => {
              console.log(each);
              return (
                <Comments
                  key={each._id}
                  commentId={props.commentId}
                  comment={each.id.comment}
                  userName={each.id.createdBy.name}
                  profileImage={each.id.createdBy.image}
                  profileId={each.id.createdBy._id}
                  createdAt={each.id.createdAt}
                />
              );
            })
          : ""}
      </Box>
    </>
  );
};

export default Comments;
