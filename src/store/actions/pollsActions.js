import axiosInstance from "../../axios";
import { notification, loading, cleanLoading } from "./notificationsActions";
export const GET_POLLS_SUCCESS = "GET_POLLS_SUCCESS";

export const getPollsSuccess = polls => {
  return {
    type: GET_POLLS_SUCCESS,
    polls
  };
};

export const getPolls = () => {
  return async dispatch => {
    dispatch(loading());

    try {
      const response = await axiosInstance.get("/polls", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      dispatch(cleanLoading());
      dispatch(getPollsSuccess(response.data.polls));
    } catch (e) {
      dispatch(cleanLoading());
      dispatch(notification(e.response.data.err, true, "/encuestas"));
    }
  };
};

export const deletePoll = id => {
  return async dispatch => {
    dispatch(loading());
    try {
      const response = await axiosInstance.delete(`/polls/${id}`, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      dispatch(getPolls());
      dispatch(cleanLoading());
      dispatch(
        notification("Encuesta eliminada con éxito", false, "/encuestas")
      );
    } catch (error) {
      dispatch(cleanLoading());
      dispatch(notification(error.response.data.err, true, "/encuestas"));
    }
  };
};

export const updatePoll = poll => {
  return dispatch => {
    const idToUpdate = poll.pollId;

    axiosInstance
      .put(`/polls/${idToUpdate}`, poll, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch(getPolls());

        dispatch(
          notification("Encuesta actualizada con éxito", false, "/encuestas")
        );
      })
      .catch(error => {
        dispatch(notification(error.response, true));
      });
  };
};

export const savePoll = poll => {
  return dispatch => {
    dispatch(loading());

    axiosInstance
      .post("/polls", poll, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch(getPolls());
        dispatch(cleanLoading());
        dispatch(
          notification("Encuesta creada con éxito", false, "/encuestas")
        );
      })
      .catch(error => {
        console.log(error.response);
        dispatch(cleanLoading());

        if (
          error.response.data.error.name === "SequelizeUniqueConstraintError"
        ) {
          dispatch(
            notification(
              "Ya existe una encuesta con ese nombre, debe ser única",
              true,
              "/encuestas/nuevo"
            )
          );
        } else {
          dispatch(
            notification(
              "Hubo un error, por favor comuníquese con el administrador del sistema",
              true,
              "/encuestas/nuevo"
            )
          );
        }
      });
  };
};
