import { GET_USERS_SUCCESS, GET_USERS_FAIL } from "../actions/usersActions";

const initialState = {
  users: null,
  error: null
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return { ...state, users: action.users };

    case GET_USERS_FAIL:
      return { ...state, error: action.erro };

    default:
      return state;
  }
};

export default usersReducer;
