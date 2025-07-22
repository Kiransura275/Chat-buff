import { createContext, useContext,  useState } from "react";
import Message from "../api/message.service";

const messageContext = createContext("");

const MessageProvider = (props) => {
  const [socket, setSocket] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messageList, setMessageList] = useState([]);

  const getContactList = async () => {
    try {
      const data = await Message.getAllUsers();

      if (data?.data?.success) setUsers(data?.data?.data?.users);
    } catch (error) {
      console.log("Error : while getting contact list");
      console.log(error);
    }
  };

  const getAllPings = async (recieverId) => {
    try {
      const data = await Message.getAllMessages(recieverId);

      if (data.data.success) {
        const allMessages = data.data.data?.map((mes) => {
          console.log(mes.sender, mes, selectedUser._id);

          return {
            mes: mes.message,
            send: mes.receiver == selectedUser._id,
          };
        });
        console.log(allMessages);
        setMessageList(allMessages);
      }
    } catch (error) {
      console.log("Error : while getting message list");
      console.log(error);
    }
  };

  const ping = async (formData, recieverId) => {
    console.log("send message !+++++++++++");
    try {
      const data = await Message.sendMessage(formData, recieverId);
      console.log(data, selectedUser);
    } catch (error) {
      console.log("Error: while sending Message !");
      console.log(error);
    }
  };

  return (
    <messageContext.Provider
      value={{
        messageList,
        setMessageList,
        users,
        getContactList,
        selectedUser,
        setSelectedUser,
        getAllPings,
        ping,
        socket,
        setSocket,
      }}
    >
      {props.children}
    </messageContext.Provider>
  );
};

export default MessageProvider;

export const useMessage = () => useContext(messageContext);
