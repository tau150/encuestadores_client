import axiosInstance from '../axios';

export const fetch = async (path, verb, data = null) => {
  try {
    const response = await axiosInstance({
      method: verb,
      url: path,
      headers: { Authorization: localStorage.getItem('token') },
      data,
    });
    return response;
  } catch (error) {
    return error;
  }
};
