export const REFRESH_TOKEN_KEY = "refreshToken"; // Stored in cookie storaga
export const USERDATA_STORAGE_KEY = "UserData"; // stored in local storage

// Based on the nobel laureate api default at https://api.nobelprize.org/2.0. Do not change
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
