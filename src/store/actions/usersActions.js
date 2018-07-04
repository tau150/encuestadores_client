import axiosInstance from "../../axios";

export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAIL = "GET_USERS_FAIL";

export const getUsersSuccess = users => {
  return {
    type: GET_USERS_SUCCESS,
    users
  };
};

export const getUsersFail = error => {
  return {
    type: GET_USERS_FAIL,
    error
  };
};

export const getUsers = () => {
  console.log("getysers");
  return dispatch => {
    axiosInstance
      .get("/users")
      .then(response => {
        dispatch(getUsersSuccess(response.data.users));
      })
      .catch(error => {
        dispatch(getUsersFail(error.response));
      });
  };
};
