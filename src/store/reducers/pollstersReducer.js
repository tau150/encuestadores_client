import {
  GET_POLLSTERS_SUCCESS,
  GET_POLLSTER_SUCCESS,
  CLEAN_POLLSTER
} from "../actions/pollstersActions";

const initialState = {
  pollsters: null,
  pollster: null
};

const pollsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POLLSTERS_SUCCESS:
      return { ...state, pollsters: action.pollsters };

    case GET_POLLSTER_SUCCESS:
      return { ...state, pollster: action.pollster };

    case CLEAN_POLLSTER:
      return { ...state, pollster: null };

    default:
      return state;
  }
};

export default pollsReducer;
