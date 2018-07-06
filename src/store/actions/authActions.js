import axiosInstance from "../../axios";
import { notification, loading, cleanLoading } from "./notificationsActions";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = (token, user) => {
  return {
    type: AUTH_SUCCESS,
    token,
    user
  };
};

export const authFail = error => {
  return {
    type: AUTH_FAIL
  };
};

export const login = (email, password) => {
  return dispatch => {
    dispatch(loading());
    const authData = {
      email: email,
      password: password
    };

    axiosInstance
      .post("http://localhost:3000/auth/login", authData)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("expiresIn", Date.now() + response.data.expiresIn);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("roleId", response.data.user.role_id);
        localStorage.setItem("userEmail", response.data.user.email);
        dispatch(authSuccess(response.data.token, response.data.user));
        dispatch(cleanLoading());
        dispatch(notification("Logueado con éxito", false));
      })
      .catch(err => {
        dispatch(notification(err.response.data.error, true));
        dispatch(authFail());
      });
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("userId");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("roleId");
  return {
    type: AUTH_LOGOUT
  };
};

export const checkAuthTimeout = () => {
  return dispatch => {
    let expiresIn = localStorage.getItem("expiresIn");
    if (expiresIn <= Date.now()) {
      return dispatch(logout());
    }
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token) {
      return dispatch(logout());
    }

    axiosInstance
      .get(`/users/${userId}`, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch(checkAuthTimeout());
        dispatch(authSuccess(token, response.data.user));
      });
  };
};
