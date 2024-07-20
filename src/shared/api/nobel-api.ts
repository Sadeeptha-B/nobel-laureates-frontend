import axios from "axios";
import { get } from "../utils/api-helper";

const baseURL = "https://api.nobelprize.org/2.0";

const instance = axios.create({
  baseURL: baseURL,
});

export const getLaureateDataById = async (laureateId: string) => {
  const data = await get(
    instance,
    `/laureate/${laureateId}`,
    `Error fetching data for Laureate Id ${laureateId}`
  );
  return data;
};

// TODO: Refactor to avoid duplication
export const getLaureates = async (offset: number) => {
  const data = await get(
    instance,
    `/laureates?offset=${offset}`,
    "Error fetching Laureates"
  );
  return data;
};
