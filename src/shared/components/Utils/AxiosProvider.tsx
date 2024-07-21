import { ReactNode, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth-context";
import axios from "axios";
import { refreshAccessToken } from "../../api/auth-api";
import { USERDATA_STORAGE_KEY } from "../../../constants";

const baseURL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

export const instance = axios.create({
  baseURL: baseURL,
});

const getResponseInterceptor = (logout: () => void) => {
  return instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;

      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const data = await refreshAccessToken();
          console.log(data);
          const accessToken = data!.token;

          localStorage.setItem(USERDATA_STORAGE_KEY, JSON.stringify(data));
          instance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          logout();
        }
      }
      return Promise.reject(error);
    }
  );
};

const AxiosProvider = ({ children }: { children: ReactNode }) => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const responseInterceptor = getResponseInterceptor(logout);
    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [logout]);

  const login = () => {};

  return children;
};

export default AxiosProvider;
