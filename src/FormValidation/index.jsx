import React, { useEffect, useState } from "react";

const FormValidation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email must not empty");
  const [passwordError, setpasswordError] = useState("Email must not empty");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]); //усли меняется чл из массива зависимостей тогда выз сама фия

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Incorrect email");
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 15) {
      setpasswordError("Incorrect password");
      if (!e.target.value) {
        setpasswordError("Empty password");
      }
    } else {
      setpasswordError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      default:
        console.log("");
    }
  };

  return (
    <div>
      <form>
        <h3>Регформа управ комп</h3>
        {emailDirty && emailError && (
          <div style={{ color: "red" }}>{emailError}</div>
        )}
        <input
          onBlur={(e) => {
            blurHandler(e);
          }}
          onChange={(e) => {
            emailHandler(e);
          }}
          value={email}
          type="email"
          name="email"
          id=""
          placeholder="..enter email"
        />
        {passwordDirty && passwordError && (
          <div style={{ color: "red" }}>{passwordError}</div>
        )}
        <input
          onBlur={(e) => {
            blurHandler(e);
          }}
          onChange={(e) => {
            passwordHandler(e);
          }}
          value={password}
          type="password"
          name="password"
          id=""
          placeholder="..enter password"
        />
        <button disabled={!formValid} type="submit">
          Registration
        </button>
      </form>
    </div>
  );
};

export default FormValidation;
