import {
  AUTH_START,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from '../actions/authActions';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  userRole: null,
  authRedirectPath: '/',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, loading: true, error: null };

    case AUTH_FAIL:
      return { ...state, loading: false, error: action.error };

    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.token,
        userRole: action.userRole,
        user: action.user,
      };

    case AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        token: null,
        userId: null,
        userRole: null,
      };

    default:
      return state;
  }
};

export default authReducer;
