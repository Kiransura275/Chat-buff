import { createFileRoute, useNavigate } from "@tanstack/react-router";
import AuthForm from "../components/AuthForm";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { isLoggedIn, userData } = useAuth();
  console.log(isLoggedIn, userData);
  useEffect(() => {
    if (isLoggedIn) {
      navigate({ to: "/home" });
    }
  }, [isLoggedIn, navigate]);
  return <AuthForm />;
}
