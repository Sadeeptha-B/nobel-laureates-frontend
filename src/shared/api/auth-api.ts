import axios from "axios";
import { USERDATA_STORAGE_KEY } from "../../constants";
import { getTokenFromLocalStorage } from "../utils/localstorage-helper";
import UserData from "../../models/UserData";

const baseURL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

export const apiInstance = axios.create({
  baseURL: `${baseURL}/api/users`,
});

apiInstance.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Implementing token refresh
apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const data = await generateRefreshToken();
        console.log(data);
        const accessToken = data!.token;

        localStorage.setItem(USERDATA_STORAGE_KEY, JSON.stringify(data));
        apiInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        return apiInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // TODO: Implement logout
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (formInputs: { [key: string]: string }) => {
  const response = await apiInstance.post(
    "/login",
    {
      email: formInputs.email,
      password: formInputs.password,
    },
    { withCredentials: true }
  );

  const { data } = response;

  if (response.status === 200) {
    localStorage.setItem(USERDATA_STORAGE_KEY, JSON.stringify(data));
    return data;
  } else {
    throw new Error(data);
  }
};

export const signup = async (formInputs: { [key: string]: string }) => {
  const response = await apiInstance.post(
    "/signup",
    {
      name: formInputs.name,
      email: formInputs.email,
      password: formInputs.password,
    },
    { withCredentials: true }
  );

  const { data } = response;

  if (response.status === 201) {
    localStorage.setItem(USERDATA_STORAGE_KEY, JSON.stringify(data));
  } else {
    throw new Error(data);
  }
};

export const generateRefreshToken = async () => {
  try {
    const response = await apiInstance.get(`/refreshToken`, {
      withCredentials: true,
    });
    const { data } = response;
    console.log(data);
    return data as UserData;
  } catch (error: any) {
    console.error(error);
  }
};