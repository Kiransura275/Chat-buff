import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Landpage from "../components/Landpage";
import Chat from "../components/Chat";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    console.log("hey bro !");

    if (isLoggedIn) {
      navigate({ to: "/home" });
    }
  }, [isLoggedIn]);
  return <Landpage />;
  // return <Chat />;
}
