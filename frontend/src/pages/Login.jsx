import React, { useState } from "react";
import apiConnection from "@services/apiConnection";
import InputTemplate from "@components/InputTemplate";
import ButtonTemplate from "@components/ButtonTemplate";

function Login() {
  const [infos, setInfos] = useState({
    email: "",
    password: "",
  });
  const handleInputOnChange = (place, value) => {
    const newUser = { ...infos };
    newUser[place] = value;
    setInfos(newUser);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    apiConnection
      .post(`/login`, {
        ...infos,
      })
      .then((curentUser) => {
        console.warn(curentUser.data);
        // handleUser(curentUser.data);
        // notify("Connected!");
        // navigate("/");
      })
      .catch((err) => {
        // notify("Wrong Credentials!");
        console.error(err);
      });
  };

  return (
    <form className="w-full flex flex-col gap-5 items-center mt-20">
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
  );
}

export default Login;
