import axios from "axios";
import moment from "moment";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_LOCAL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'multipart/form-data',
  },
});
instance.interceptors.request.use(
  async function (config) {
    let accessToken = localStorage.getItem("token_admin");
    if (accessToken) {
      const expireTime =
        moment().add(12, "minute") || localStorage.getItem("expires_time");

      if (expireTime && moment().add(5, 'minute').isAfter(moment(expireTime))) {
        try {
          const {data} = await refreshTokenApi()
          accessToken = data.accessToken
          localStorage.setItem('token_admin', data.accessToken)
          localStorage.setItem('refresh_token_admin', data.refreshToken)
          localStorage.setItem('expires_time', moment().add(data.expiresTime, 'seconds'))
        } catch (error) {
          window.location.assign("/");
          localStorage.removeItem("token_admin");
        }
      }
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
