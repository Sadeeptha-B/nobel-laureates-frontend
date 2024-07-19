import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/localstorage-helper";

const baseURL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

export const instance = axios.create({
  baseURL: `${baseURL}/api/comments`,
});

instance.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const getCommentsByLaureateId = async (laureateId: string) => {
  try {
    const response = await instance.get(`/laureate/${laureateId}`);
    const { data } = response;

    if (response.status === 200) {
      return data.comments;
    } else {
      throw new Error(data);
    }
  } catch (error) {
    console.log(`Error getting comments for Laureate Id: ${laureateId}`);
  }
};

export const postComment = async () => {};
