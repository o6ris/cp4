import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import apiConnection from "@services/apiConnection";
import InputTemplate from "@components/InputTemplate";
import ButtonTemplate from "@components/ButtonTemplate";

import User from "../contexts/UserContext";

function Login() {
  const { handleUser } = useContext(User.UserContext);
  const [infos, setInfos] = useState({
    email: "",
    password: "",
  });
  const handleInputOnChange = (place, value) => {
    const newUser = { ...infos };
    newUser[place] = value;
    setInfos(newUser);
  };

  const navigate = useNavigate();

  const notify = (msg) => {
    toast(msg);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    apiConnection
      .post(`/login`, {
        ...infos,
      })
      .then((curentUser) => {
        handleUser(curentUser.data);
        notify("Connected!");
        navigate("/FindCity");
      })
      .catch((err) => {
        notify("Wrong Credentials!");
        console.error(err);
      });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Helmet>
        <meta charSet="utf-8" />
        <title>City Rater - Login</title>
        <meta
          name="description"
          content="Log in to rate city destinations on our site."
        />
      </Helmet>
      <div className=" flex flex-col items-center w-full pt-5">
        <img className="h-20" src="../assets/logo.png" alt="" />
        <p className="text-xs">Find and rate your destination!</p>
      </div>
      <form className="pageContainer">
        <InputTemplate
          textPlaceholder="email"
          customWidth="inputStyle"
          inputType="text"
          methodOnChange={handleInputOnChange}
          name="email"
        />
        <InputTemplate
          textPlaceholder="password"
          customWidth="inputStyle"
          inputType="password"
          methodOnChange={handleInputOnChange}
          name="password"
        />
        <ButtonTemplate
          buttonType="submit"
          buttonText="Log In"
          buttonStyle="buttonStyle"
          methodOnClick={handleLogin}
        />
      </form>
    </>
  );
}

export default Login;
