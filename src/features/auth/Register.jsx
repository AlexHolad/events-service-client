import { useState} from "react";

import { Link, useNavigate } from "react-router-dom";

import { QueryClient, useMutation, useQueryClient} from "@tanstack/react-query";
import { register } from "../../app/api";

import { useEventActions } from "../../app/store";

// CSS
import "./Register.css";

import Button from "../../components/Button.component/Button";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const queryClient = useQueryClient()
  const {setToken} = useEventActions()

  const {mutate} = useMutation({
    mutationFn: register,
    onSuccess: ({data}) => {
      queryClient.setQueryData(["accessToken"], () => data)
      setToken(data)
      navigate("/user")
    },
    onError: (error) => {
      setErrMsg(error.response.data)
    }
  })

  const navigate = useNavigate();

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const handleRegister = async () => {
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
    mutate({ email, password });
  };

  return (
    <div className="registerform__container">
      <h3 className="register__headline">Регистрация</h3>
      <h5 className="register__error">{errMsg}</h5>
      <div className="form__item">
        <h4 htmlFor="title">Электронная почта</h4>
        <input
          className="input"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={onEmailChanged}
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
        />
      </div>
      <p className="register__p">
        <span>Уже есть Аккаунт?</span>{" "}
        <Link to="/signin" className="register__link">
          Войти
        </Link>
      </p>
      <div className="registerform__actions">
        <Button className="form__btn" action={handleRegister}>
          {"Зарегистрироваться"}
        </Button>
      </div>
    </div>
  );
}

export default Register;
