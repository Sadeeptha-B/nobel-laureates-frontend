import axios from "axios";
import { USERDATA_STORAGE_KEY } from "../../constants";
import { get } from "../utils/api-helper";

// Try catch error handling is delegated to component
export const login = async (formInputs: { [key: string]: string }) => {
  const response = await axios.post("/api/users/login", {
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
  const response = await axios.post("/api/users/signup", {
    name: formInputs.name,
    email: formInputs.email,
    password: formInputs.password,
  });
  const { data } = response;

  if (response.status === 201) {
    localStorage.setItem(USERDATA_STORAGE_KEY, JSON.stringify(data));
    return data;
  } else {
    throw new Error(data);
  }
};

export const logout = async () => {
  const response = await axios.post("api/users/logout");

  if (response.status != 200) {
    console.error("Error logging out", response);
  }
};

export const refreshAccessToken = async () => {
  const data = get(
    axios,
    "/api/users/refreshToken",
    "Error generating access token"
  );
  return data;
};

export const getAuthenticatedUserDetails = async () => {
  const data = get(
    axios,
    "api/users/getAuthUser",
    "Error retrieving authenticated user"
  );
  return data;
};
