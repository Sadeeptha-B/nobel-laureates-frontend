import { get } from "../utils/api-helper";
import { instance } from "./auth-api";

// Using same instance as auth api since it's the same domain and for simplicity
// import { instance } from "../components/Utils/AxiosErrorHandler";
// of sharing the interception logic. Might not be best practice
export const getCommentsByLaureateId = async (laureateId: string) => {
  const data = await get(
    instance,
    `api/comments/laureate/${laureateId}`, // TODO: Convert to query param req
    `Error getting comments for Laureate Id: ${laureateId}`
  );
  return data.comments;
};

export const postComment = async (
  laureateId: string,
  content: string
) => {
  const response = await instance.post("api/comments/", {
    laureateId,
    content,
  });

  const {data} = response;

  if (response.status === 201){
    return data;
  } else {
    throw new Error(data);
  }
};
