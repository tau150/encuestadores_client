import { GET_CITIES_SUCCESS } from "../actions/citiesActions";

const initialState = {
  cities: null
};

const pollsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CITIES_SUCCESS:
      return { ...state, cities: action.cities };

    default:
      return state;
  }
};

export default pollsReducer;
