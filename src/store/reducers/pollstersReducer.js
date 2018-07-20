import { GET_POLLSTERS_SUCCESS } from "../actions/pollstersActions";

const initialState = {
  pollsters: null
};

const pollsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POLLSTERS_SUCCESS:
      return { ...state, pollsters: action.pollsters };

    default:
      return state;
  }
};

export default pollsReducer;
