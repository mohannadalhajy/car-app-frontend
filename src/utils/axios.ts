import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BACK_END_API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
