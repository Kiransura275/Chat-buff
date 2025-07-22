/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-condition */
import React, { useEffect, useRef } from "react";
import { Left, More, Send } from "../assets/assets";
import { useMessage } from "../context/MessageContext";
import Ping from "./Ping";
import { useState } from "react";

const ChatBox = () => {
  const [sendData, setSendData] = useState("");
  const bottomRef = useRef(null);

  const {
    selectedUser,
    setSelectedUser,
    ping,
    getAllPings,
    messageList,
    setMessageList,
    socket,
  } = useMessage();
  useEffect(() => {
    setTimeout(
      () => bottomRef?.current?.scrollIntoView({ behaviour: "smooth" }),
      1200
    );
  }, [messageList]);

  const handleSend = async () => {
    if (sendData?.trim() == "") return;
    const formData = new FormData();
    formData.append("message", sendData);
    setMessageList([...messageList, { mes: sendData, send: true }]);

    ping(formData, selectedUser._id).catch(() => {
      setMessageList([...messageList].splice(messageList.length - 1, 1));
    });
    socket.emit("newMessage", sendData, selectedUser._id);

    setSendData("");
  };

  useEffect(() => {
    if (!selectedUser) return;
    getAllPings(selectedUser._id);
  }, []);

  return (
    <div
      className={`h-[100%] sm:w-2/3 w-full bg-neutral-900 sm:block ${!selectedUser && "hidden"}`}
    >
      <nav className="flex justify-between  px-10 py-5 bg-[#101010]">
        <div className="flex justify-center items-center gap-5">
          <img
            src={Left}
            className="object-cover hover:scale-90 w-5 cursor-pointer "
            onClick={() => setSelectedUser(null)}
          />
          <div className=" flex justify-center items-center">
            <img
              src={selectedUser.avatar || "https://placehold.co/100"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col ml-6">
              <h5 className="text-white text-[18px]">
                {selectedUser.userName}
              </h5>
              <span
                className={`text-sm ${true ? "text-green-500" : "text-gray-500"} `}
              >
                {true ? "online" : "offline"}
              </span>
            </div>
          </div>
        </div>

        <img src={More} className="w-9 h-9" />
      </nav>

      {/* //messages */}

      <main className="w-full px-5  flex flex-col-reverse sm:max-h-[73vh] max-h-[71%] min-h-[71%] sm:min-h-[73vh]   overflow-y-scroll ">
        <div className="min-h-0 flex flex-col gap-3 overflow-auto relative">
          {messageList.map(({ mes, send }, index) => (
            <Ping
              message={mes}
              key={String(mes + Date.now()) + index}
              send={send}
            />
          ))}
          <div ref={bottomRef}></div>
        </div>
      </main>

      <aside className="  px-10 ">
        <div className="w-full flex justify-between items-center rounded-full bg-black my-4">
          <input
            type="text"
            placeholder="Enter message"
            className="w-[90%] px-8 py-4 text-[14px] outline-0 text-white "
            value={sendData}
            onChange={(e) => setSendData(e.target.value)}
            onKeyDown={({ key }) => key == "Enter" && handleSend()}
          />
          <div
            className=" bg-green-400  rounded-full mx-5 cursor-pointer px-3 py-1 hover:scale-95"
            onClick={handleSend}
          >
            <img src={Send} className="w-9 rounded-full  cursor-pointer" />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ChatBox;
