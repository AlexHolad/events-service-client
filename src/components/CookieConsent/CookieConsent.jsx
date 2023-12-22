import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Button from "../Button.component/Button";

import "./CookieConsent.css";

export default function CookieConsent() {
  const [cookies, setCookie] = useCookies(["cookieConsent"]);
  const giveCookieConsent = () => {
    setCookie("cookieConsent", true, { path: "/" });
  };
  return (
    <div className="cookie-consent__container ">
        <p className="cookie-consent__text">
          Наш сайт использует файлы cookie, чтобы улучшить работу сайта,
          повысить его эффективность и удобство. Продолжая использовать сайт
          svoi.berlin, вы соглашаетесь на использование файлов cookie.{" "}
          <Link to={"/datenschutz"}>Узнать больше</Link>
        </p>
        <Button action={giveCookieConsent}>Ok</Button>
      </div>
  );
}
