import axiosInstance from "../../axios";
import { notification, loading, cleanLoading } from "./notificationsActions";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAIL = "GET_USERS_FAIL";

export const getUsersSuccess = users => {
  return {
    type: GET_USERS_SUCCESS,
    users
  };
};

// export const getUsersFail = error => {
//   return {
//     type: GET_USERS_FAIL,
//     error
//   };
// };

export const getUsers = () => {
  return dispatch => {
    dispatch(loading());

    axiosInstance
      .get("/users", {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch(cleanLoading());
        dispatch(getUsersSuccess(response.data.users));
      })
      .catch(error => {
        dispatch(cleanLoading());
        dispatch(notification(error.response.data.err, true, "/usuarios"));
        // dispatch(getUsersFail(error.response));
      });
  };
};

export const deleteUser = id => {
  return dispatch => {
    dispatch(loading());
    axiosInstance
      .delete(`/users/${id}`, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch(getUsers());
        dispatch(cleanLoading());
        dispatch(
          notification("Usuario eliminado con éxito", false, "/usuarios")
        );
      })
      .catch(error => {
        dispatch(cleanLoading());
        dispatch(notification(error.response.data.err, true, "/usuarios"));
      });
  };
};

export const updateUser = user => {
  return dispatch => {
    const role = user.role_id;
    const idToUpdate = user.userId;
    const loggedUserId = localStorage.getItem("userId");

    if (
      idToUpdate === loggedUserId &&
      role !== localStorage.getItem("roleId")
    ) {
      return dispatch(
        notification(
          "No puede cambiar su propio rol, comuníquese con el adminsitrador",
          true,
          "/usuarios"
        )
      );
    }

    axiosInstance
      .put(`/users/${user.userId}`, user, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch(getUsers());

        dispatch(
          notification("Usuario actualizado con éxito", false, "/usuarios")
        );
      })
      .catch(error => {
        dispatch(notification(error.response, true));
      });
  };
};

export const saveUser = user => {
  return dispatch => {
    dispatch(loading());

    axiosInstance
      .post("/users", user, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch(getUsers());
        dispatch(cleanLoading());
        dispatch(notification("Usuario creado con éxito", false, "/usuarios"));
      })
      .catch(error => {
        console.log(error.response);
        dispatch(cleanLoading());

        if (
          error.response.data.error.name === "SequelizeUniqueConstraintError"
        ) {
          dispatch(
            notification(
              "Ya existe un usuario con ese correo",
              true,
              "/usuarios/nuevo"
            )
          );
        } else {
          dispatch(
            notification(
              "Hubo un error, por favor comuníquese con el administrador del sistema",
              true,
              "/usuarios/nuevo"
            )
          );
        }
      });
  };
};
