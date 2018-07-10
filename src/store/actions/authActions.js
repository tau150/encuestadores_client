import axiosInstance from '../../axios';
import { notification, loading, cleanLoading } from './notificationsActions';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (token, user) => {
  return {
    type: AUTH_SUCCESS,
    token,
    user,
  };
};

export const authFail = error => {
  return {
    type: AUTH_FAIL,
  };
};

// export const login = (email, password) => {
//   return dispatch => {
//     dispatch(loading());

//     const authData = {
//       email,
//       password,
//     };

//     axiosInstance
//       .post('/auth/login', authData)
//       .then(response => {
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('expiresIn', Date.now() + response.data.expiresIn);
//         localStorage.setItem('userId', response.data.user.id);
//         localStorage.setItem('roleId', response.data.user.role_id);
//         localStorage.setItem('userEmail', response.data.user.email);
//         dispatch(authSuccess(response.data.token, response.data.user));
//         dispatch(cleanLoading());
//         dispatch(notification('Logueado con éxito', false));
//       })
//       .catch(err => {
//         console.log(err.response);
//         dispatch(cleanLoading());
//         dispatch(notification(err.response.data.error, true));
//       });
//   };
// };

export const login = (email, password) => {
  return async dispatch => {
    dispatch(loading());
    const authData = {
      email,
      password,
    };
    try {
      const response = await axiosInstance.post('/auth/login', authData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expiresIn', Date.now() + response.data.expiresIn);
      localStorage.setItem('userId', response.data.user.id);
      localStorage.setItem('roleId', response.data.user.role_id);
      localStorage.setItem('userEmail', response.data.user.email);
      dispatch(authSuccess(response.data.token, response.data.user));
      dispatch(cleanLoading());
      dispatch(notification('Logueado con éxito', false));
    } catch (err) {
      dispatch(cleanLoading());
      dispatch(notification(err.response.data.error, true));
    }
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiresIn');
  localStorage.removeItem('userId');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('roleId');
  return {
    type: AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = () => {
  return dispatch => {
    let expiresIn = localStorage.getItem('expiresIn');
    if (expiresIn <= Date.now()) {
      return dispatch(logout());
    }
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token) {
      return dispatch(logout());
    }

    axiosInstance
      .get(`/users/${userId}`, {
        headers: { Authorization: localStorage.getItem('token') },
      })
      .then(response => {
        dispatch(checkAuthTimeout());
        dispatch(authSuccess(token, response.data.user));
      });
  };
};

// export const recoverPassword = email => {
//   return dispatch => {
//     axiosInstance
//       .post('/auth/recover', { email })
//       .then(response => {
//         dispatch(cleanLoading());
//         dispatch(
//           notification('La nueva contraseña fue enviada a su correo', false)
//         );
//       })
//       .catch(err => {
//         dispatch(notification(err.response.data.error, true));
//       });
//   };
// };

export const recoverPassword = email => {
  return async dispatch => {
    try {
      const response = await axiosInstance.post('/auth/recover', { email });
      dispatch(cleanLoading());
      dispatch(
        notification('La nueva contraseña fue enviada a su correo', false)
      );
    } catch (err) {
      dispatch(notification(err.response.data.error, true));
    }
  };
};

// export const changePassword = user => {
//   return dispatch => {
//     dispatch(loading());

//     axiosInstance
//       .post(
//         '/auth/changePassword',
//         { user },
//         {
//           headers: { Authorization: localStorage.getItem('token') },
//         }
//       )
//       .then(response => {
//         dispatch(cleanLoading());
//         dispatch(logout());
//         dispatch(
//           notification(
//             'Su contraseña fue actualizada con éxito, vuelva a iniciar sesión',
//             false
//           )
//         );
//       })
//       .catch(err => {
//         dispatch(cleanLoading());
//         dispatch(notification(err.response.data.error, true));
//       });
//   };
// };

export const changePassword = user => {
  return async dispatch => {
    dispatch(loading());

    try {
      const response = await axiosInstance.post(
        '/auth/changePassword',
        { user },
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );
      dispatch(cleanLoading());
      dispatch(logout());
      dispatch(
        notification(
          'Su contraseña fue actualizada con éxito, vuelva a iniciar sesión',
          false
        )
      );
    } catch (err) {
      dispatch(cleanLoading());
      dispatch(notification(err.response.data.error, true));
    }
  };
};
