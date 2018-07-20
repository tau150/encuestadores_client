import axiosInstance from "../../axios";
import { notification, loading, cleanLoading } from "./notificationsActions";
export const GET_POLLSTERS_SUCCESS = "GET_POLLSTERS_SUCCESS";

export const getPollsSuccess = pollsters => {
  return {
    type: GET_POLLSTERS_SUCCESS,
    pollsters
  };
};

export const getPollsters = () => {
  return async dispatch => {
    dispatch(loading());

    try {
      const response = await axiosInstance.get("/pollsters", {
        headers: { Authorization: localStorage.getItem("token") }
      });

      console.log(response);
      dispatch(cleanLoading());
      dispatch(getPollsSuccess(response.data.pollsters));
    } catch (e) {
      dispatch(cleanLoading());
      dispatch(notification(e.response.data.err, true, "/encuestadores"));
    }
  };
};

export const deletePollster = id => {
  return dispatch => {
    dispatch(loading());
    axiosInstance
      .delete(`/pollsters/${id}`, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch(getPollsters());
        dispatch(cleanLoading());
        dispatch(
          notification(
            "Encuestador eliminado con éxito",
            false,
            "/encuestadores"
          )
        );
      })
      .catch(error => {
        dispatch(cleanLoading());
        console.log(error.response);
        dispatch(
          notification(error.response.data.error, true, "/encuestadores")
        );
      });
  };
};

export const savePollster = pollster => {
  return dispatch => {
    dispatch(loading());

    console.log(pollster);
    axiosInstance
      .post("/pollsters", pollster, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "content-type": "multipart/form-data"
        }
      })
      .then(response => {
        dispatch(cleanLoading());
        dispatch(notification("Usuario creado con éxito", false, "/usuarios"));
      })
      .catch(error => {
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
