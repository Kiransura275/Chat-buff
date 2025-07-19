/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

import { useMessage } from "../context/MessageContext";
import Contacts from "./Contacts";
import SearchBar from "./SearchBar";
import ChatBox from "./ChatBox";

const Chat = () => {
  const { getContactList, selectedUser } = useMessage();

  useEffect(() => {
    getContactList().then(() => {
      console.log("users fetched !");
    });
  }, [selectedUser]);

  return (
    <div className="h-screen   w-full sm:flex sm:gap-8 ">
      {/* left section */}
      <section
        className={`h-[100%] sm:w-1/3  w-full bg-transparent sm:block ${selectedUser && "hidden"}`}
      >
        <SearchBar />
        <Contacts />
      </section>

      {/* //right section */}
      {!selectedUser ? (
        <div className="h-[100%] w-2/3 bg-neutral-900"></div>
      ) : (
        <ChatBox />
      )}
    </div>
  );
};

export default Chat;
