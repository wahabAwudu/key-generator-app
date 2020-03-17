/* eslint-disable */
import axios from "axios";

export const baseUrl = process.env.REACT_APP_API_ENDPOINT;


export const keysUrl = baseUrl + "keys/";

export const getHeaders = () => {
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";

  const headers = {
    "Content-Type": "application/json",
  };
  return headers;
};



// show for error action.
export const errorToast = (toast, message, error, props) => {
  if (error.response) {
    if (error.response.status === 401) {
      toast.error("Session Expired", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
      // remove expired creds

      // go to login page
      props.history.push("/");
    } else {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  } else {
    toast.error("can't connect to server, check internet connection.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true
    });
  }
};

// show for success action.
export const successToast = (toast, message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true
  });
};

export const infoToast = (toast, message) => {
  toast.info(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true
  });
};

