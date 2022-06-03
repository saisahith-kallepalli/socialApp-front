import { baseURL } from "./constants/urls";
import { del, get, post, put } from "./http/httpMethods";
function getPosts(token: string) {
  return get(`${baseURL}/posts`, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    return response;
  });
}

function newPost(token: string, data: any) {
  return post(`${baseURL}/posts`, data, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    return response;
  });
}
function likePost(id: string, token: string) {
  return post(`${baseURL}/posts/like/${id}`, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    return response;
  });
}
function disLikePost(id: string, token: string) {
  return del(`${baseURL}/posts/like/${id}`, {
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
};
