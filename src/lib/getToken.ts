import axiosClient from "./axios";

const getToken = async () => {
  const url = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;
  const res = await axiosClient.get(url + "/api/token");
  return res.data.token;
};

export default getToken;
