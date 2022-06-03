import { baseURL } from "./constants/urls";
import { get, post, put } from "./http/httpMethods";
function getComments(id: string, token: string) {
  return get(`${baseURL}/comments/post/${id}`, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    console.log(response);
    return response;
  });
}
function postComment(id: string, token: string, body: any) {
  return post(`${baseURL}/comments/post/${id}`, body, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    console.log(response);
    return response;
  });
}
function replyComment(
  postId: string,
  commentId: string,
  token: string,
  body: any
) {
  return post(`${baseURL}/comments/comment/${postId}/${commentId}`, body, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    console.log(response);
    return response;
  });
}
export const commentService = {
  getComments,
  postComment,
  replyComment,
};
