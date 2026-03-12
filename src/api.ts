import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8088",
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");

  if (user) {
    const parsedUser = JSON.parse(user);
    config.headers.Authorization = `Bearer ${parsedUser.token}`;
  }

  return config;
});

export default api;