import axios from "axios";
import { get } from "../utils/api-helper";

export const getCommentsByLaureateId = async (laureateId: string) => {
  const data = await get(
    axios,
    `api/comments/laureate/${laureateId}`, // TODO: Convert to query param req
    `Error getting comments for Laureate Id: ${laureateId}`
  );
  return data.comments;
};

export const postComment = async (laureateId: string, content: string) => {
  const response = await axios.post("api/comments/", {
    laureateId,
    content,
  });

  const { data } = response;

  if (response.status === 201) {
    return data;
  } else {
    throw new Error(data);
  }
};
