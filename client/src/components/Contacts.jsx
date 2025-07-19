import React from "react";
import { useMessage } from "../context/MessageContext";
import Card from "./Card";

const Contacts = () => {
  const { users, selectedUser, setSelectedUser } = useMessage();
  return (
    <>
      <div className=" mx-4 my-3  max-h-[76vh] overflow-auto">
        {users.map((user, index) => (
          <Card
            name={user.userName}
            image={user.avatar.trim() || "https://placehold.co/100"}
            key={user._id}
            online={!(index % 2)}
            onClick={() => {
              if (selectedUser?._id != user._id) {
                setSelectedUser(user);
              }
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Contacts;
