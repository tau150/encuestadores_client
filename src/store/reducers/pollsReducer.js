import { GET_POLLS_SUCCESS } from '../actions/pollsActions';

const initialState = {
  polls: null,
};

const pollsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POLLS_SUCCESS:
      return { ...state, polls: action.polls };

    default:
      return state;
  }
};

export default pollsReducer;
