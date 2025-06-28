import axiosClient from "./axios";

const getToken = async () => {
  const res = await axiosClient.get("/api/token");
  return res.data.token;
};

export default getToken;
