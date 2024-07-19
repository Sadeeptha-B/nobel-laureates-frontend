import axios from "axios";

const baseURL = "https://api.nobelprize.org/2.0";

const instance = axios.create({
  baseURL: baseURL,
});

export const getLaureateDataById = async (laureateId: string) => {
  try {
    console.log("I run");
    const response = await instance.get(`/laureate/${laureateId}`);

    const { data } = response;

    if (response.status === 200) {
      return data;
    } else {
      throw new Error(data);
    }
  } catch (error) {
    console.log("Error fetching Laureate data: ", error);
  }
};
