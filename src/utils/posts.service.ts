import Cookies from "js-cookie";
import { baseURL } from "./constants/urls";
import { del, get, post, put } from "./http/httpMethods";
import { error } from "console";

const authToken = Cookies.get("_token");
const token = "Bearer " + authToken;
function getPosts(limit: number) {
  return get(`${baseURL}/posts?limit=${limit}`, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    console.log(response)
    return response;
  })
  .catch((error)=>{
    console.log(error,"==Error")
  })
}

function newPost(data: any) {
  return post(`${baseURL}/posts`, data, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    return response;
  });
}
function likePost(id: string) {
  return post(`${baseURL}/posts/like/${id}`, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    return response;
  });
}

function savePost(id: string) {
  return post(`${baseURL}/posts/save/${id}`, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    return response;
  });
}
function disLikePost(id: string) {
  return del(`${baseURL}/posts/like/${id}`, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    return response;
  });
}
function unSavePost(id: string) {
  return del(`${baseURL}/posts/save/${id}`, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    return response;
  });
}

function savedPosts() {
  return get(`${baseURL}/posts/self/saved`, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    return response;
  });
}
export const postService = {
  getPosts,
  likePost,
  disLikePost,
  newPost,
  savedPosts,
  savePost,
  unSavePost,
};
