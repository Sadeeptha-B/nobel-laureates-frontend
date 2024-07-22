import { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import axios from "axios";
import { refreshAccessToken } from "../../api/auth-api";
import { USERDATA_STORAGE_KEY } from "../../../constants";
import { getTokenFromLocalStorage } from "../../utils/localstorage-helper";

const baseURL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";
const tokenRefreshURL = "/api/users/refreshToken";

const AxiosProvider = ({ children }: { children: ReactNode }) => {
  const auth = useContext(AuthContext);
  const [isInit, setIsInit] = useState(false);

  // axios setup running on component mount
  useEffect(() => {
    axios.defaults.baseURL = baseURL;
    axios.defaults.withCredentials = true;

    // Request interceptor
    axios.interceptors.request.use((config) => {
      const token = getTokenFromLocalStorage();

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor
    const responseInterceptor = setupResponseInterceptor();

    setIsInit(true);
    // Cleanup
    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [auth.logout]);

  const setupResponseInterceptor = () => {
    return axios.interceptors.response.use(
      (response) => {
        return response;
      },

      async function (error) {
        const originalRequest = error.config;
        const isRefreshURL = tokenRefreshURL === originalRequest.url;

        if (
          error.response.status === 403 &&
          !originalRequest._retry &&
          !isRefreshURL
        ) {
          originalRequest._retry = true;

          try {
            const data = await refreshAccessToken();

            // If data is null, throw error
            const accessToken = data!.token;

            localStorage.setItem(USERDATA_STORAGE_KEY, JSON.stringify(data));
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            auth.logout();
          }
        }
        return Promise.reject(error);
      }
    );
  };

  return isInit ? children : <></>;
};

export default AxiosProvider;
