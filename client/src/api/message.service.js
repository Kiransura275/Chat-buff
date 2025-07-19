import axiosInstance from "./axios";

const Message = {
  getAllUsers: async () => {
    return await axiosInstance.get("/api/v1/message/get-all-users");
  },
  getAllMessages: async (id) => {
    return await axiosInstance.get(`/api/v1/message/get-all-messages/${id}`);
  },
  setMessageAsSeen: async () => {
    return await axiosInstance.get("/api/v1/message/");
  },

  sendMessage: async (data, id) => {
    console.log("sending message");

    console.log(id);
    return await axiosInstance.post(`/api/v1/message/send-message/${id}`, data);
  },
};

export default Message;
