import React, { useEffect, useState } from "react";
import "./home.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { PostContainer } from "../../components/postContainer";
import Cookies from "js-cookie";
import { postService } from "../../utils/posts.service";
import { post } from "../../utils/http/httpMethods";

export default function Home() {
  const authToken = Cookies.get("_token");
  const token = "Bearer " + authToken;
  const [posts, setPosts] = useState<Array<any>>([]);
  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    fetchPosts();
  }, [like]);
  const fetchPosts = async () => {
    const data = await postService.getPosts(token);
    console.log(data.results);
    setPosts(data.results);
  };
  const setRenderLikes = () => {
    setLike((pre) => !pre);
  };
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Home
        </Typography>
        {posts?.map((each: any) => {
          return (
            <PostContainer
              key={each._id}
              userName={each.createdBy.name}
              profileImage={each.createdBy.image}
              postImages={each.image}
              postId={each._id}
              postCaption={each.caption}
              profileId={each.createdBy._id}
              postLikes={each.likes}
              setRenderLikes={setRenderLikes}
            />
          );
        })}
      </Box>
    </Container>
  );
}
