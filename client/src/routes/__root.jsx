import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ToastContainer } from "react-toastify";
import User from "../api/auth.sevice";
import { useAuth } from "../context/AuthContext";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { setIsLoggedIn, setUserData, isLoggedin, userData } = useAuth();

  React.useEffect(() => {
    User.me()
      .then((user) => {
        if (user) {
          if (user.data.success) {
            setIsLoggedIn(true);
            setUserData(user.data.data);
            console.log("call", isLoggedin, userData);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <React.Fragment>
      <div className="bg-black w-full min-h-screen">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

        <Outlet />
      </div>
    </React.Fragment>
  );
}
