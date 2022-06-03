import React, { useEffect, useState } from "react";
import "./home.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { PostContainer } from "../../components/postContainer";
import Cookies from "js-cookie";
import { postService } from "../../utils/posts.service";
import { post } from "../../utils/http/httpMethods";
import { postsData } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const authToken = Cookies.get("_token");
  const dispatch = useDispatch();
  const token = "Bearer " + authToken;
  // const [posts, setPosts] = useState<Array<any>>([]);
  const [like, setLike] = useState<boolean>(false);
  const [posting, setPosting] = useState<boolean>(false);
  const posts = useSelector((state: any) => state.postsData.posts.results);
  const newPost = useSelector((state: any) => state.postsData.newPost);
  // console.log(postsDataGet.posts.results);
  useEffect(() => {
    fetchPosts();
  }, [like, newPost]);
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 100,
      behavior: "smooth",
    });
  }, [newPost]);
  const fetchPosts = async () => {
    const data = await postService.getPosts(token);
    dispatch(postsData(data));
    // setPosts(data.results);
  };

  const setRenderLikes = () => {
    setLike((pre) => !pre);
  };
  return (
    <Container sx={{ marginTop: "80px" }}>
      <Box sx={{ my: 4 }}>
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
              createdAt={each.createdAt}
              setRenderLikes={setRenderLikes}
            />
          );
        })}
      </Box>
    </Container>
  );
}
