import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: { Authorization: localStorage.getItem("token") }
});

export default axiosInstance;
