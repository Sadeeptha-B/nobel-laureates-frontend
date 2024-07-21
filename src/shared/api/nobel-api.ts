import axios from "axios";
import { generateQueryParamString, get } from "../utils/api-helper";

const baseURL = "https://api.nobelprize.org/2.0";

const instance = axios.create({
  baseURL: baseURL,
});

// Constants based on the api
export const LAUREATES_FETCH_OFFSET = 25;
export const NOBEL_PRIZE_CATEGORIES: [string, string][] = [
  ["che", "Chemistry"],
  ["eco", "Economics"],
  ["lit", "Literature"],
  ["pea", "Peace"],
  ["phy", "Physics"],
  ["med", "Medicine"],
];
export const GENDERS: [string, string][] = [
  ["male", "Male"],
  ["female", "Female"],
  ["other", "Other"],
];

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
    [key: string]: string;
  }
) => {
  let queryString = "";

  if (filterQueryObj) {
    queryString = generateQueryParamString(filterQueryObj, "all");
  }

  const separator = queryString != "" ? "&" : "";
  const url = `/laureates?offset=${offset}${separator}${queryString}`;
  const data = await get(instance, url, "Error fetching Laureates");
  return data;
};
