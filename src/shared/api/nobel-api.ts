import axios from "axios";
import { generateQueryParamString, get } from "../utils/api-helper";

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

export const getLaureates = async (
  offset: number,
  filterQueryObj?: {
    [key: string]: string ;
  }
) => {

  let queryString = `offset=${offset}`;
  if (filterQueryObj) {
    queryString = generateQueryParamString(filterQueryObj, "all");
  }

  const data = await get(
    instance,
    `/laureates?offset=${offset}${queryString != "" && `&${queryString}`}`,
    "Error fetching Laureates"
  );
  return data;
};
