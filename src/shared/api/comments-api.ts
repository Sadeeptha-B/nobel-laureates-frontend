import { get } from "../utils/api-helper";
import { instance } from "./auth-api";

// Using same instance as auth api since it's the same domain and for simplicity
// import { instance } from "../components/Utils/AxiosErrorHandler";
// of sharing the interception logic. Might not be best practice
export const getCommentsByLaureateId = async (laureateId: string) => {
  const data = await get(
    instance,
    `api/comments/laureate/${laureateId}`,
    `Error getting comments for Laureate Id: ${laureateId}`
  );
  return data.comments;
};

export const postComment = async () => {};
