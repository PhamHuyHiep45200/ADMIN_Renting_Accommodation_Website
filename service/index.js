import axios from "axios";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_LOCAL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'multipart/form-data',
  },
});
instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("token_admin");
    if (accessToken) {
      config.headers.Authorization = "Bearer " + accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    if (response.status === 401) {
      window.location.assign("/");
      localStorage.removeItem("token_admin");
    }
    return response.data;
  },
  function (error) {
    if (error.response) {
      return Promise.reject(error);
    }
  }
);

const request = (url, options) => {
  return instance.request({ ...options, url: url });
};
export default request;