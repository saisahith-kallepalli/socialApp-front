import { BehaviorSubject } from "rxjs";
import { get, post, put } from "./http/httpMethods";
import Cookie from "js-cookie";
import history from "../routes/history";
import { paths } from "../routes/routes.config";
import { showErrorToast } from "./toastUtil";
import { baseURL } from "./constants/urls";

let currentUserFromStorage: any;

/*
 * Get current user from local storage
 */
try {
  currentUserFromStorage = localStorage.getItem("currentUser");
  currentUserFromStorage = JSON.parse(currentUserFromStorage);
  //   if (currentUserFromStorage) {
  //     loadCurrentUser();
  //   }
} catch (e) {
  showErrorToast("Could not find user in local storage");
  logout();
}

const currentUserSubject = new BehaviorSubject(
  currentUserFromStorage || undefined
);
// const currentOrganizationSubject = new BehaviorSubject(
//   (currentUserFromStorage &&
//     currentUserFromStorage._org &&
//     currentUserFromStorage._org[0]) ||
//     undefined
// );

/*
 * Export as a Type
 */
export const authenticationService = {
  emailVerification,
  passwordVerification,
  // locateToLogin,
  // locateToSignUp,
  registerUser,
  //initials
  logout,
  authToken,
  register,
  verifyCredentials,
  loadCurrentUser,
  requestPasswordReset,
  setPassword,
  isUserAndTokenAvailable,
  verifyOTP,
  handleLogin,
  localLogout,
  resendOTP,
  unsubscribeAll,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
  // currentOrganization: currentOrganizationSubject.asObservable(),
  // get currentOrganizationValue() {
  //   return currentOrganizationSubject.value;
  // },
};

// function locateToSignUp() {
//   history.push(paths.signup);
//   window.location.reload();
// }
// function locateToLogin() {
//   history.push(paths.login);
//   window.location.reload();
// }
function emailVerification(email: string) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}
function passwordVerification(password: string) {
  return password.match(/^(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/);
}

/*
 * Verify OTP method
 */
function verifyCredentials(payload: any) {
  // return new Promise((resolve, reject) => {
  //   handleLogin({ token: "AABBCC", user: defaultUsers[0] });
  //   resolve(true);
  // });
  return post(`${baseURL}/auth/login`, payload)
    .then((response: any) => {
      handleLogin({
        token: response.token,
        user: response.user,
      });

      return response;
    })
    .catch((error: any) => {
      showErrorToast(
        error.message || "Error occurred while validating credentials!"
      );
      return error;
    });
}

function registerUser(payload: any) {
  // return new Promise((resolve, reject) => {
  //   handleLogin({ token: "AABBCC", user: defaultUsers[0] });
  //   resolve(true);
  // });
  return post(`${baseURL}/auth/register`, payload)
    .then((response: any) => {
      handleLogin({
        token: response.token,
        user: response.user,
      });

      return response;
    })
    .catch((error: any) => {
      showErrorToast(
        error.message || "Error occurred while validating credentials!"
      );
      return error;
    });
}

/*
 * Verify OTP method
 */
function requestPasswordReset(payload: any) {
  return post("/api/user/password/reset", payload).then((response: any) => {
    return response;
  });
}

/*
 * Unsubscribe all subjects to avoid memory leak
 */
function unsubscribeAll() {
  currentUserSubject.unsubscribe();
  // currentOrganizationSubject.unsubscribe();
}

/*
 * Logout method
 */
function logout() {
  return get(`/api/auth/logout`)
    .then((response) => {
      // remove user from local storage to log user out
      localStorage.removeItem("currentUser");

      Cookie.remove("_token", { path: "/" });

      currentUserSubject.next({});

      history.push("/auth/login");
      // window.location.reload()
      return response;
    })
    .catch((error) => {
      // remove user from local storage to log user out
      localStorage.removeItem("currentUser");

      Cookie.remove("_token", { path: "/" });

      currentUserSubject.next({});

      history.push("/auth/login");
    });
}

/*
 * Local logout, don't send API call
 */
function localLogout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");

  Cookie.remove("_token", { path: "/" });

  currentUserSubject.next({});

  history.push("/auth/login");
  window.location.reload();
}

/*
 * Get auth token from cookie
 */
function authToken() {
  return Cookie.get("_token");
}

/*
 * Register user method
 */
function register(payload: any) {
  return post("/api/user/sign-up", payload).then((response: any) => {
    // handleLogin(response)
    return response;
  });
}

/*
 * Set new password
 */
function setPassword(payload: any, token: string) {
  return put("/api/user/password", payload, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    return response;
  });
}

/*
 * Verify OTP
 */
function verifyOTP(payload: any) {
  return post("/api/auth/second-factor", payload).then((response: any) => {
    return response;
  });
}

/*
 * Verify OTP
 */
function resendOTP() {
  return get("/api/auth/regenerate-second-factor").then((response: any) => {
    handleLogin(response);
    return response;
  });
}

/*
 * Verify invitation
 */
function isUserAndTokenAvailable() {
  return authToken() && JSON.parse(localStorage.getItem("currentUser") as any);
}

/*
 * Fetch current user
 */
function loadCurrentUser() {
  get(`/api/auth/self`).then((response: any) => {
    localStorage.setItem("currentUser", JSON.stringify(response));
    currentUserSubject.next(response);
    // currentOrganizationSubject.next(response._org[0]);
  });
}

/*
 * Register user method
 */
function handleLogin(response: any) {
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  console.log(response);

  Cookie.set("_token", response.token, { expires: 1, path: "/" });

  localStorage.setItem("currentUser", JSON.stringify(response.user));

  currentUserSubject.next(response.user);

  if (response.user && !response.user._pre) {
    history.push(paths.home);
  }
}
