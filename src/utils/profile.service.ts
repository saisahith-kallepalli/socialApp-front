import Cookies from "js-cookie";
import { baseURL } from "./constants/urls";
import { del, get, patch, post, put } from "./http/httpMethods";
import { showErrorToast, showSuccessToast } from "./toastUtil";

const authToken = Cookies.get("_token");
const token = "Bearer " + authToken;

const updateProfileImage = async (data: any) => {
  return put(`${baseURL}/users/profile`, data, {
    headers: { Authorization: `${token}` },
  })
    .then((response) => {
      showSuccessToast("Profile Image Updated");
      return response;
    })
    .catch((error) => {
      showErrorToast(error);
    });
};

const searchUsers = async (data: any) => {
  return get(`${baseURL}/users?name=` + data, {
    headers: { Authorization: `${token}` },
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      showErrorToast(error);
    });
};
const getUserDetails = async (data: any) => {
  return get(`${baseURL}/users/` + data, {
    headers: { Authorization: `${token}` },
  })
    .then((response) => {
      console.log(response, "=====>user");
      return response;
    })
    .catch((error) => {
      showErrorToast(error);
    });
};
const removeProfileImage = async () => {
  return del(`${baseURL}/users/profile`, {
    headers: { Authorization: `${token}` },
  })
    .then((response) => {
      showSuccessToast("Profile Image Removed");
      return response;
    })
    .catch((error) => {
      showErrorToast(error);
      return error;
    });
};
const updateProfileDetails = async (data: any) => {
  return patch(`${baseURL}/users/profile`, data, {
    headers: { Authorization: `${token}` },
  })
    .then((response) => {
      showSuccessToast("Profile Successfully Saved");
      return response;
    })
    .catch((error) => {
      console.log(error);
      showErrorToast(error.message);
      return error;
    });
};
export const profileService = {
  updateProfileImage,
  removeProfileImage,
  updateProfileDetails,
  getUserDetails,
  searchUsers,
};
