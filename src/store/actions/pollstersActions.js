import axiosInstance from "../../axios";
import { notification, loading, cleanLoading } from "./notificationsActions";
export const GET_POLLSTERS_SUCCESS = "GET_POLLSTERS_SUCCESS";
export const GET_POLLSTER_SUCCESS = "GET_POLLSTER_SUCCESS";
export const CLEAN_POLLSTER = "CLEAN_POLLSTER";

export const getPollstersSuccess = pollsters => {
  return {
    type: GET_POLLSTERS_SUCCESS,
    pollsters
  };
};

export const getPollsterSuccess = pollster => {
  return {
    type: GET_POLLSTER_SUCCESS,
    pollster
  };
};

export const cleanPollster = () => {
  return {
    type: CLEAN_POLLSTER
  };
};

export const getPollsters = () => {
  return async dispatch => {
    dispatch(loading());

    try {
      const response = await axiosInstance.get("/pollsters", {
        headers: { Authorization: localStorage.getItem("token") }
      });

      dispatch(cleanLoading());
      dispatch(getPollstersSuccess(response.data.pollsters));
    } catch (e) {
      dispatch(cleanLoading());
      dispatch(notification(e.response.data.err, true, "/encuestadores"));
    }
  };
};

export const savePollster = pollster => {
  return dispatch => {
    dispatch(loading());

    axiosInstance
      .post("/pollsters", pollster, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "content-type": "multipart/form-data"
        }
      })
      .then(response => {
        dispatch(getPollsters());
        dispatch(cleanLoading());
        dispatch(
          notification("Encuestador creado con éxito", false, "/encuestadores")
        );
      })
      .catch(error => {
        dispatch(cleanLoading());
        dispatch(
          notification(error.response.data.error, true, "/encuestadores/nuevo")
        );
      });
  };
};

export const updatePollster = (pollster, id) => {
  return dispatch => {
    axiosInstance
      .put(`/pollsters/${id}`, pollster, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch(getPollsters());
        dispatch(
          notification(
            "Encuestador actualizado con éxito",
            false,
            "/encuestadores"
          )
        );
      })
      .catch(error => {
        dispatch(notification(error.response.data.error, true));
      });
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
        dispatch(notification(error.response.data.err, true, "/encuestadores"));
      });
  };
};

export const getPollster = id => {
  return async dispatch => {
    dispatch(loading());

    try {
      const response = await axiosInstance.get(`/pollsters/${id}`, {
        headers: { Authorization: localStorage.getItem("token") }
      });

      dispatch(getPollsterSuccess(response.data.pollster));
      dispatch(cleanLoading());
    } catch (e) {
      dispatch(cleanLoading());
      dispatch(notification(e.response.data.err, true, "/encuestadores"));
    }
  };
};
