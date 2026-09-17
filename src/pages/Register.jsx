import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Register() {
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [values, setValues] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [errorCode, setErrorCode] = useState("");

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (values.password.length < 6) {
      setErrorCode("SHORT_PASSWORD");
      return;
    }
    try {
      register(values);
      navigate("/orders");
    } catch (err) {
      setErrorCode(err.message);
    }
  }

  return (
    <section className="auth-page">
      <h1>{t("auth.registerTitle")}</h1>
      <p className="auth-page__note">{t("auth.registerNote")}</p>

      {errorCode && (
        <p className="form-error" role="alert">
          {t(`errors.${errorCode}`)}
        </p>
      )}

      <form className="order-form" onSubmit={handleSubmit}>
        <div className="order-form__row">
          <div className="field">
            <label htmlFor="firstName">{t("form.firstName")}</label>
            <input id="firstName" value={values.firstName} onChange={(e) => update("firstName", e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="lastName">{t("form.lastName")}</label>
            <input id="lastName" value={values.lastName} onChange={(e) => update("lastName", e.target.value)} required />
          </div>
        </div>
        <div className="field">
          <label htmlFor="email">{t("auth.email")}</label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="password">{t("auth.password")}</label>
          <input
            id="password"
            type="password"
            value={values.password}
            onChange={(e) => update("password", e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>
        <button type="submit" className="btn btn--gold btn--full">
          {t("auth.createAccountButton")}
        </button>
      </form>

      <p className="auth-page__switch">
        {t("auth.haveAccount")} <Link to="/login">{t("auth.loginLink")}</Link>
      </p>
    </section>
  );
}
