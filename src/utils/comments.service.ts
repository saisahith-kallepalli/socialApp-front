import Cookies from "js-cookie";
import { baseURL } from "./constants/urls";
import { del, get, post, put } from "./http/httpMethods";

const authToken = Cookies.get("_token");
const token = "Bearer " + authToken;
function getComments(id: string) {
  return get(`${baseURL}/comments/post/${id}`, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    return response;
  });
}
function postComment(id: string, body: any) {
  return post(`${baseURL}/comments/post/${id}`, body, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    console.log(response);
    return response;
  });
}
function replyComment(postId: string, commentId: string, body: any) {
  return post(`${baseURL}/comments/comment/${postId}/${commentId}`, body, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    console.log(response);
    return response;
  });
}
function likeComment(id: string) {
  return post(`${baseURL}/comments/like/${id}`, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    return response;
  });
}
function dislikeComment(id: string) {
  return del(`${baseURL}/comments/like/${id}`, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    return response;
  });
}
export const commentService = {
  getComments,
  postComment,
  replyComment,
  likeComment,
  dislikeComment,
};
