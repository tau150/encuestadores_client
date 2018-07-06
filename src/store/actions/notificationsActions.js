export const NOTIFICATION = "NOTIFICATION";
export const CLEAN_NOTIFICATION = "CLEAN_NOTIFICATION";
export const LOADING = "LOADING";
export const CLEAN_LOADING = "CLEAN_LOADING";

export const notification = (message, error, redirectPath) => {
  return {
    type: NOTIFICATION,
    message,
    error,
    redirectPath
  };
};

export const loading = () => {
  return {
    type: LOADING
  };
};

export const cleanNotification = (message, error) => {
  return {
    type: CLEAN_NOTIFICATION
  };
};

export const cleanLoading = () => {
  return {
    type: CLEAN_LOADING
  };
};
