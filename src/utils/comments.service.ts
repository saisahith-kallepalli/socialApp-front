import { baseURL } from "./constants/urls";
import { get, post, put } from "./http/httpMethods";
function getComments(id: string, token: string) {
  return get(`${baseURL}/comments/post/${id}`, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    return response;
  });
}
export const commentService = {
  getComments,
};
