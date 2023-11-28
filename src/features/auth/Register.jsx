import { useState, useEffect } from "react"

import { Link, useNavigate } from "react-router-dom"

import { useToken } from "../../app/store";
import { useEventActions } from "../../app/store";



// CSS
import "./Register.css"

import Button from "../../components/Button.component/Button"

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {register} = useEventActions()

    const accessToken = useToken()
    const navigate = useNavigate()

    const onEmailChanged = e => setEmail(e.target.value) 
    const onPasswordChanged = e => setPassword(e.target.value) 

    useEffect(()=> {if(accessToken){navigate("/events/add")}}, [accessToken, navigate])

    const handleRegister = async () => { 
      try {
        await register({email, password}) 
      } catch (err) {
        console.log(err)
      }
      
    }

    const handleClear = () => {
        setEmail('')
        setPassword('')
    }

  return (
    <div className="registerform__container">
        <div className="form__item">
          <h4 htmlFor="title">Электронная почта</h4>
        <input
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
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onPasswordChanged}
          />
          </div>
          <p><span>Уже есть Аккаунт?</span> <Link to="/signin">Войти</Link></p>
          <div className="actions">
        <Button className="form__btn" action={handleRegister}>
          {"Зарегистрироваться"}
        </Button>
        <Button className="form__btn" action={handleClear}>
          {"Очистить"}
        </Button>
      </div>
    </div>
  )
}

export default Register