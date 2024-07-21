import { USERDATA_STORAGE_KEY } from "../../constants";
import { UserAuthData } from "../../models/UserData";

export const getUserDataFromLocalStorage = () => {
  const userDataJson = localStorage.getItem(USERDATA_STORAGE_KEY);

  if (userDataJson) {
    const userData: UserAuthData = JSON.parse(userDataJson);

    if (userData.token) {
      return userData;
    }
  }
  return null;
};

export const getTokenFromLocalStorage = () => {
  const userData = getUserDataFromLocalStorage();

  if (userData) {
    return userData.token;
  }
  return null;
};
