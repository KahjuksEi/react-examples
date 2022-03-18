import React, { useEffect, useState } from "react";

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "maxLength":
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;
        case "isEmail":
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          re.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        default:
          console.log("");
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || minLengthError || maxLengthError || emailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, maxLengthError, emailError]);

  return { isEmpty, minLengthError, maxLengthError, emailError, inputValid };
};

//кастомный хук это юзаем внутри какие либо станд реакт хуки и чтото возвр
const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    setDirty(true); //вышли из инпута или еще нет
  };
  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

const HardFormValidation = () => {
  const email = useInput("", { isEmpty: true, minLength: 3 });
  const password = useInput("", { isEmpty: true, minLength: 5 });

  return (
    <div>
      <form>
        <h3>Сложная форма управ комп</h3>
        {email.isDirty && email.isEmpty && (
          <div style={{ color: "red" }}>Field must not empty</div>
        )}
        {email.isDirty && email.minLengthError && (
          <div style={{ color: "red" }}>Field must not short</div>
        )}
        <input
          onChange={(e) => email.onChange(e)}
          onBlur={(e) => email.onBlur(e)}
          value={email.value}
          type="email"
          name="email"
          id=""
          placeholder="..enter email"
        />
        {password.isDirty && password.isEmpty && (
          <div style={{ color: "red" }}>Field must not empty</div>
        )}
        {password.isDirty && password.minLengthError && (
          <div style={{ color: "red" }}>Field must not short</div>
        )}
        <input
          onChange={(e) => password.onChange(e)}
          onBlur={(e) => password.onBlur(e)}
          value={password.value}
          type="password"
          name="password"
          id=""
          placeholder="..enter password"
        />
        <button
          disabled={!email.inputValid || !password.inputValid}
          type="submit"
        >
          Registration
        </button>
      </form>
    </div>
  );
};

export default HardFormValidation;
