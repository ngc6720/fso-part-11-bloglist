let navigate = null;

const AxiosInterceptorsSetup = (_navigate) => (navigate = _navigate);

export const redirectOnInvalidSession = (axios) => {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        window.localStorage.clear();
        navigate?.("/login");
      }
      return Promise.reject(error);
    }
  );
};

export default AxiosInterceptorsSetup;
