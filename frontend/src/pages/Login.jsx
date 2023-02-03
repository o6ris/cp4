import React, { useState } from "react";
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
        inputType="text"
        methodOnChange={handleInputOnChange}
        name="email"
      />
      <ButtonTemplate
        buttonType="button"
        buttonText="Log In"
        buttonStyle="buttonStyle"
        // methodOnClick={validateLogin}
      />
    </form>
  );
}

export default Login;
