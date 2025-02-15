import axios from "axios";

const removeEmptyParams = (obj) => {
  if (!obj) return {};
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== "" && v !== null && v !== undefined));
};

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.showLoader !== false) {
      window.dispatchEvent(new Event("showLoader"));
    }

    if (config.params) {
      config.params = removeEmptyParams(config.params);
    }

    return config;
  },
  (error) => {
    window.dispatchEvent(new Event("hideLoader"));
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.config.showLoader !== false) {
      window.dispatchEvent(new Event("hideLoader"));
    }
    return response;
  },
  (error) => {
    window.dispatchEvent(new Event("hideLoader"));
    return Promise.reject(error);
  }
);

const httpServices = {
  get: (url, params, showLoader = true) =>
    axiosInstance.get(url, { params: removeEmptyParams(params), showLoader }),

  post: (url, data, showLoader = true) =>
    axiosInstance.post(url, data, {
      showLoader,
      headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
    }),

  put: (url, data, showLoader = true) =>
    axiosInstance.put(url, data, {
      showLoader,
      headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
    }),

  delete: (url, showLoader = true) => axiosInstance.delete(url, { showLoader }),
};

export default httpServices;
