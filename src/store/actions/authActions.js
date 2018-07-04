import axiosInstance from "../../axios";
import axios from "axios";

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
    type: AUTH_FAIL,
    error: error
  };
};

export const login = (email, password) => {
  console.log("action");
  return dispatch => {
    dispatch(authStart());

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
        localStorage.setItem("userEmail", response.data.user.email);
        dispatch(authSuccess(response.data.token, response.data.user));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("userId");
  localStorage.removeItem("userEmail");

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

    let config = {
      headers: {
        Authorization: token
      }
    };

    axiosInstance.get(`/users/${userId}`).then(response => {
      dispatch(checkAuthTimeout());
      dispatch(authSuccess(token, response.data.user));
    });
  };
};
