import { AxiosInstance } from "axios";

export const get = async (
  instance: AxiosInstance,
  url: string,
  errMsg: string
) => {
  try {
    const response = await instance.get(url);

    const { data } = response;

    if (response.status === 200) {
      return data;
    } else {
      throw new Error(data);
    }
  } catch (error) {
    console.error(`${errMsg}: ${error}`);
  }
};
