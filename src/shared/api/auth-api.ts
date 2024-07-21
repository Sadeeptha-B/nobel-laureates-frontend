import axios from "axios";
import { USERDATA_STORAGE_KEY } from "../../constants";
import { getTokenFromLocalStorage } from "../utils/localstorage-helper";
import UserData from "../../models/UserData";
import { get } from "../utils/api-helper";
// import { instance } from "../components/Utils/AxiosErrorHandler";

const baseURL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

export const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Implementing token refresh
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const data = await refreshAccessToken();
        const accessToken = data!.token;

        localStorage.setItem(USERDATA_STORAGE_KEY, JSON.stringify(data));
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // TODO: Implement logout
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (formInputs: { [key: string]: string }) => {
  const response = await instance.post("/api/users/login", {
    email: formInputs.email,
    password: formInputs.password,
  });

  const { data } = response;

  if (response.status === 200) {
    localStorage.setItem(USERDATA_STORAGE_KEY, JSON.stringify(data));
    return data;
  } else {
    throw new Error(data);
  }
};

export const signup = async (formInputs: { [key: string]: string }) => {
  const response = await instance.post("/api/users/signup", {
    name: formInputs.name,
    email: formInputs.email,
    password: formInputs.password,
  });

  const { data } = response;

  if (response.status === 201) {
    localStorage.setItem(USERDATA_STORAGE_KEY, JSON.stringify(data));
  } else {
    throw new Error(data);
  }
};

export const refreshAccessToken = async () => {
  const data = get(
    instance,
    "/api/users/refreshToken",
    "Error generating access token"
  );
  return data;
};
