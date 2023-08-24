import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { PostContainer } from "../../components/postContainer";
import Cookies from "js-cookie";
import { postService } from "../../utils/posts.service";
import { post } from "../../utils/http/httpMethods";
import { postsData, savedPosts } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import SavedPostContainer from "../../components/savedPostContainer/savedPostContainer";

export default function Saved() {
  const dispatch = useDispatch();
  const [like, setLike] = useState<boolean>(false);

  let posts = useSelector((state: any) => state.postsData.saved);
  const newPost = useSelector((state: any) => state.postsData.newPost);

  useEffect(() => {
    fetchSaved();
  }, [like, newPost]);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 100,
      behavior: "smooth",
    });
  }, [newPost]);

  const fetchSaved = async () => {
    const data = await postService.savedPosts();
    dispatch(savedPosts(data.saved.saved.reverse()));
    // setPosts(data.results);
  };

  const setRenderLikes = () => {
    setLike((pre) => !pre);
  };
  return (
    <Container sx={{ marginTop: "80px" }}>
      <Box
        sx={{
          ml: "8%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {posts?.map((each: any) => {
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
    </Container>
  );
}
