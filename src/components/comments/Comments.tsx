import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

type Props = {
  commentId: string;
  comment: string;
  userName: string;
  profileImage: string;
  profileId: string;
};

const Comments = (props: Props) => {
  return (
    <Box sx={{ display: "flex", p: "13px" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Avatar
          alt={props.userName}
          src={props.profileImage || "https://sajsd.com"}
        />
        <label className="userName">{props.userName}</label>
      </Box>
      <p>{props.comment}</p>
    </Box>
  );
};

export default Comments;
