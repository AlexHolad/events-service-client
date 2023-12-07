import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useEventActions } from "../../app/store";

import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const { signin } = useEventActions();

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const handleSend = async () => {
    if (!email && !password) {
      return setErrMsg("Все поля обязательны для заполнения");
    } else if (!email) {
      return setErrMsg("Необходимо ввести Email");
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
      return setErrMsg("Некорректный формат email");
    }
    if (!password) {
      return setErrMsg("Необходимо ввести Password");
    } else if (password.length < 8) {
      return setErrMsg("Password должен содержать минимум 8 знаков");
    }
    setErrMsg("");
    try {
      await signin({ email, password });
      setEmail("");
      setPassword("");
      navigate("/user")
    } catch (err) {
      console.log("Error", err)
    }
  };

  const content = (
    <div className="signinform__container">
      <h3 className="signin__headline">Добро пожаловать</h3>
      <h5 className="signin__error">{errMsg}</h5>
      <div className="form__item">
        <h4 htmlFor="title">Электронная почта</h4>
        <input
          className="input"
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
          className="input"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onPasswordChanged}
          required
        />
      </div>
{/* 
      <p className="signin__p">
        <span>Нет Аккаунта?</span>{" "}
        <Link to="/register" className="signin__link">
          Создать
        </Link>
      </p> */}
      <div className="signinform__actions">
        <button className="form__btn button" onClick={handleSend}>
          {"Войти"}
        </button>
      </div>
    </div>
  );

  return content;
};

export default SignIn;
