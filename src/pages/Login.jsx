import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorCode, setErrorCode] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    try {
      login(email, password);
      navigate(location.state?.from || "/orders");
    } catch (err) {
      setErrorCode(err.message);
    }
  }

  return (
    <section className="auth-page">
      <h1>{t("auth.loginTitle")}</h1>
      <p className="auth-page__note">{t("auth.loginNote")}</p>

      {errorCode && (
        <p className="form-error" role="alert">
          {t(`errors.${errorCode}`)}
        </p>
      )}

      <form className="order-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">{t("auth.email")}</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="password">{t("auth.password")}</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <button type="submit" className="btn btn--gold btn--full">
          {t("auth.loginButton")}
        </button>
      </form>

      <p className="auth-page__switch">
        {t("auth.newHere")} <Link to="/register">{t("auth.createAccountLink")}</Link>
      </p>
    </section>
  );
}
