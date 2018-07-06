import {
  NOTIFICATION,
  CLEAN_NOTIFICATION,
  LOADING,
  CLEAN_LOADING
} from "../actions/notificationsActions";

const initialState = {
  error: null,
  message: null,
  redirectPath: null,
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION:
      return {
        ...state,
        message: action.message,
        error: action.error,
        redirectPath: action.redirectPath
      };

    case LOADING:
      return {
        ...state,
        loading: true
      };

    case CLEAN_NOTIFICATION:
      return { ...state, message: null, error: null, redirectPath: null };

    case CLEAN_LOADING:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default authReducer;
