import axios from "axios";
let MAIN_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const login = async (data: any) => {
  try {
    const res = await axios.post(`${MAIN_URL}/login`, data, {
      headers: {
        Authorization: "Bearer ",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};