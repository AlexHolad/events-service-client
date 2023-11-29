import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useEventActions } from "../../app/store";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("error");

  const navigate = useNavigate()
  const {signin} = useEventActions()

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const handleSend = async () => {
    try {
      signin({ email, password });
      setEmail("");
      setPassword("");
      navigate("/user");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === "400") {
        setErrMsg("Missing Username or Password");
      } else if (err.status === "401") {
        setErrMsg("Unathorized");
      } else {
        setErrMsg(err.data?.message);
      }
    }
  };
  const handleClear = () => {
    setEmail("");
    setPassword("");
    navigate("user");
  };

  const content = (
    <div className="registerform__container">
      <h3>{errMsg}</h3>
      <div className="form__item">
        <h4 htmlFor="title">Электронная почта</h4>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={onEmailChanged}
          autoComplete="off"
          required
        />
      </div>
      <div className="form__item">
        <h4 htmlFor="title">Пароль</h4>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onPasswordChanged}
          required
        />
      </div>
      
      <p><span>Нет Аккаунта?</span> <Link to="/register">Зарегистрироваться </Link></p>
      <div className="actions">
        <button className="form__btn" onClick={handleSend}>
          {"Войти"}
        </button>
        <button className="form__btn" onClick={handleClear}>
          {"Очистить"}
        </button>
      </div>
    </div>
  );

  return content;
};

export default SignIn;
