import axiosInstance from '../../axios';
import { notification, loading, cleanLoading } from './notificationsActions';
export const GET_POLLS_SUCCESS = 'GET_POLLS_SUCCESS';

export const getPollsSuccess = polls => {
  return {
    type: GET_POLLS_SUCCESS,
    polls,
  };
};

export const getPolls = () => {
  return async dispatch => {
    dispatch(loading());

    try {
      const response = await axiosInstance.get('/polls', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      dispatch(cleanLoading());
      dispatch(getPollsSuccess(response.data.polls));
    } catch (e) {
      dispatch(cleanLoading());
    }
  };
};

export const deletePoll = id => {
  return async dispatch => {
    dispatch(loading());
    try {
      const response = await axiosInstance.delete(`/polls/${id}`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      dispatch(getPolls());
      dispatch(cleanLoading());
      dispatch(
        notification('Encuesta eliminada con éxito', false, '/encuestas')
      );
    } catch (error) {
      dispatch(cleanLoading());
      dispatch(notification(error.response.data.err, true, '/encuestas'));
    }
  };
};

// export const updateUser = user => {
//   return dispatch => {
//     const role = user.role_id;
//     const idToUpdate = user.userId;
//     const loggedUserId = localStorage.getItem('userId');

//     if (
//       idToUpdate === loggedUserId &&
//       role !== localStorage.getItem('roleId')
//     ) {
//       return dispatch(
//         notification(
//           'No puede cambiar su propio rol, comuníquese con el adminsitrador',
//           true,
//           '/usuarios'
//         )
//       );
//     }

//     axiosInstance
//       .put(`/users/${user.userId}`, user, {
//         headers: { Authorization: localStorage.getItem('token') },
//       })
//       .then(response => {
//         dispatch(getUsers());

//         dispatch(
//           notification('Usuario actualizado con éxito', false, '/usuarios')
//         );
//       })
//       .catch(error => {
//         dispatch(notification(error.response, true));
//       });
//   };
// };

// export const saveUser = user => {
//   return dispatch => {
//     dispatch(loading());

//     axiosInstance
//       .post('/users', user, {
//         headers: { Authorization: localStorage.getItem('token') },
//       })
//       .then(response => {
//         dispatch(getUsers());
//         dispatch(cleanLoading());
//         dispatch(notification('Usuario creado con éxito', false, '/usuarios'));
//       })
//       .catch(error => {
//         console.log(error.response);
//         dispatch(cleanLoading());

//         if (
//           error.response.data.error.name === 'SequelizeUniqueConstraintError'
//         ) {
//           dispatch(
//             notification(
//               'Ya existe un usuario con ese correo',
//               true,
//               '/usuarios/nuevo'
//             )
//           );
//         } else {
//           dispatch(
//             notification(
//               'Hubo un error, por favor comuníquese con el administrador del sistema',
//               true,
//               '/usuarios/nuevo'
//             )
//           );
//         }
//       });
//   };
// };
