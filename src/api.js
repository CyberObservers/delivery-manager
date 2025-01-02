import axios from "axios";
import { BASE_URL, TOKEN_KEY } from "./constants";
import { message } from "antd";

/*
 *  auth api
 */

const authApi = axios.create({
  baseURL: `${BASE_URL}/auth`,
  withCredentials: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
 *  delivery api
 */

const orderApi = axios.create({
  baseURL: `${BASE_URL}/order`,
  withCredentials: true,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

orderApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

orderApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      message.error("Please login first.");
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/*
 *  profile api
 */

const profileApi = axios.create({
  baseURL: `${BASE_URL}/profile`,
  withCredentials: true,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

profileApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

profileApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      message.error("Please login first.");
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/*
 *  history api
 */
const historyApi = axios.create({
  baseURL: `${BASE_URL}/history`,
  withCredentials: true,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

historyApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

historyApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      message.error("Please login first.");
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// general api
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      message.error("Please login first.");
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { authApi, orderApi, historyApi, profileApi };
export default api;
