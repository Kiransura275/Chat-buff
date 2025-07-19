import React, { useState } from "react";
import User from "../api/auth.sevice";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(false); // true for login, false for register

  // State for login form
  const [loginCredential, setLoginCredential] = useState(""); // Can be email or contact
  const [loginPassword, setLoginPassword] = useState("");

  // State for register form
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerContact, setRegisterContact] = useState("");
  const [registerAvatar, setRegisterAvatar] = useState("");
  const [registerBio, setRegisterBio] = useState("");

  const { setIsLoggedIn, setUserData } = useAuth();

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", loginCredential);
    console.log(formData, loginCredential);
    formData.append("password", loginPassword);
    try {
      const user = await User.login(formData);
      if (!user || !user.data.success) {
        console.log("Invalid Credentials");
      }
      if (user.data.success) {
        setIsLoggedIn(true);
        setUserData(user?.data?.data);
      }
      console.log(user.data);
      toast.success(user.data.message);
      navigate({ to: "/home" });
    } catch (err) {
      console.log("Invalid Credentials");
      toast.error(err.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", registerUsername);
    formData.append("email", registerEmail);
    formData.append("password", registerPassword);
    formData.append("contact", registerContact);
    formData.append("bio", registerBio);
    if (registerAvatar) formData.append("avatar", registerAvatar);
    console.log("Register attempt:", {
      userName: registerUsername,
      email: registerEmail,
      password: registerPassword,
      contact: registerContact,
      avatar: registerAvatar,
      bio: registerBio,
    });
    try {
      const user = await User.register(formData);
      if (!user || !user.data.success) {
        console.log("Provide data in valid Format");
      }

      if (user.data.success) {
        setIsLoggedIn(true);
        setUserData(user?.data?.data);
      }
      console.log(user.data);
      toast.success(user.data.message);
      navigate("/home");
    } catch (err) {
      console.log("Error while Register");
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-4">
      <div className="backdrop-blur-3xl shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-white text-xl font-semibold mb-6 text-center">
          Welcome to Chat
          <span className="text-green-400 font-extrabold">Buff</span>,{" "}
          {isLogin ? "login" : "register"} with
        </h2>

        <div className="flex justify-center space-x-4 mb-6">
          <button className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2">
            <img
              src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_64dp.png"
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            Google
          </button>
          <button className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png"
              alt="Twitter"
              className="h-5 w-5 mr-2"
            />
            Twitter
          </button>
        </div>

        <div className="text-center text-gray-400 mb-6">
          Or continue with email
        </div>

        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor={"Email or Contact"}
              >
                {"Email or Contact"} <span className="text-red-500">*</span>
              </label>
              <input
                type={"text"}
                id={"Email or Contact"}
                className="shadow appearance-none border rounded w-full text-white py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600  placeholder-gray-400"
                placeholder={"hello@mantine.dev or +1234567890"}
                value={loginCredential}
                onChange={(e) => setLoginCredential(e.target.value)}
                required={true}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor={"password"}
              >
                {"password"} <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Your password"
                isRequired={true}
                id={"password"}
                className="shadow appearance-none border text-white rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600  placeholder-gray-400"
                required={true}
              />
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Login
              </button>
            </div>
            <div className="mt-4 text-center">
              <span className="text-gray-400">Don't have an account? </span>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-blue-500 hover:text-green-400 font-bold focus:outline-none cursor-pointer"
              >
                Register
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor={"Username"}
              >
                {"Username"} <span className="text-red-500">*</span>
              </label>
              <input
                label="Username"
                type="text"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                placeholder="Your unique username"
                id={"Username"}
                className="shadow appearance-none border text-white rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600  placeholder-gray-400"
                required={true}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="email"
              >
                {"email"} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="your@email.com"
                isRequired={true}
                id={"email"}
                className="shadow appearance-none border text-white rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600  placeholder-gray-400"
                required={true}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="Password"
              >
                {"Password"} <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="Choose a strong password"
                id={"Password"}
                className="shadow appearance-none border text-white rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600  placeholder-gray-400"
                required={true}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="Contact"
              >
                {"Contact"} <span className="text-red-500">*</span>
              </label>
              <input
                label="Contact"
                type="text"
                value={registerContact}
                onChange={(e) => setRegisterContact(e.target.value)}
                placeholder="+1234567890 (optional)"
                id={"Contact"}
                className="shadow appearance-none border text-white rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600  placeholder-gray-400"
                required={true}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor={"Bio"}
              >
                {"Bio"}
              </label>
              <textarea
                id={"Bio"}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white placeholder-gray-400 h-24 resize-none"
                placeholder={"Tell us about yourself (optional)"}
                value={registerBio}
                onChange={(e) => setRegisterBio(e.target.value)}
                required={false}
              />
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Register
              </button>
            </div>
            <div className="mt-4 text-center">
              <span className="text-gray-400">Already have an account? </span>
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-blue-500 font-bold focus:outline-none cursor-pointer hover:text-green-400"
              >
                Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
