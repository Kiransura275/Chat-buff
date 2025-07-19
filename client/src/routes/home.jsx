import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import Chat from "../components/Chat";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";
import { useMessage } from "../context/MessageContext";

export const Route = createFileRoute("/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoggedIn, userData } = useAuth();
  const { setSocket, messageList, setMessageList } = useMessage();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate({ to: "/" });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const sock = io(`http://localhost:8000`, {
      query: {
        userId: userData?._id,
      },
    });
    setSocket(sock);
    console.log("socket connected !");
    sock.on("connect", (s) => console.log("Socket ----- connected !", s));
    console.log(
      "1111111111111111111111111111111111111111111111111111111",
      messageList
    );
    sock.on("newMes", (mes) => {
      console.log("Archieved ++++++++++++++++++//////////////////???/", mes);
      setMessageList([...messageList, { mes: mes, send: false }]);
    });

    return () => {
      setSocket({});
      sock.disconnect();
    };
  }, [messageList]);

  return <Chat />;
}
