import axiosInstance from "../../axios";
import { notification, loading, cleanLoading } from "./notificationsActions";
export const GET_CITIES_SUCCESS = "GET_CITIES_SUCCESS";

export const getCitiesSuccess = cities => {
  return {
    type: GET_CITIES_SUCCESS,
    cities
  };
};

export const getCities = () => {
  return async dispatch => {
    dispatch(loading());

    try {
      const response = await axiosInstance.get("/cities", {
        headers: { Authorization: localStorage.getItem("token") }
      });

      // const trasnformedResponse = response.data.cities.map(city => {
      //   return { ...city, nameFormatted: city.city };
      // });

      // console.log(trasnformedResponse);

      dispatch(cleanLoading());
      dispatch(getCitiesSuccess(response.data.cities));
    } catch (e) {
      dispatch(cleanLoading());
      dispatch(notification(e.response.data.err, true, "/encuestadores"));
    }
  };
};
