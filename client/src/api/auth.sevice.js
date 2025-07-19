import axiosInstance from "./axios";

const User = {
  register: async (formData) => {
    return await axiosInstance.post("/api/v1/user/register", formData);
  },
  login: async (formData) => {
    return await axiosInstance.post("/api/v1/user/login", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
  },
  me: async () => {
    return await axiosInstance.get("/api/v1/user/me");
  },
  logout: async () => {
    return await axiosInstance.get("/api/v1/user");
  },
};

export default User;
