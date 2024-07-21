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

export const generateQueryParamString = (
  obj: { [key: string]: string | number },
  excludeVal?: string
) => {
  let resArr = [];

  // Exclude val to exclude keys if they contain certain param values
  for (const key in obj) {
    if (excludeVal && excludeVal === obj[key]) {
      continue;
    }
    resArr.push(`${key}=${obj[key]}`);
  }

  return resArr.join("&");
};
