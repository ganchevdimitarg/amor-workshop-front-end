import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9\s().-]{7,20}$/;

export default function Register() {
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [errorCode, setErrorCode] = useState("");

  function update(field, value) {
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    setErrorCode("");
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function validate(v) {
    const errs = {};
    const email = v.email.trim();
    const phone = v.phone.trim();

    if (!v.firstName.trim()) errs.firstName = t("form.errFirstName");
    if (!v.lastName.trim()) errs.lastName = t("form.errLastName");
    if (!email) {
      errs.email = t("form.errEmailRequired");
    } else if (!EMAIL_PATTERN.test(email)) {
      errs.email = t("form.errEmail");
    }
    if (!phone) {
      errs.phone = t("form.errPhone");
    } else if (!PHONE_PATTERN.test(phone)) {
      errs.phone = t("form.errPhoneInvalid");
    }
    if (v.password.length < 6) {
      errs.password = t("errors.SHORT_PASSWORD");
    }

    return errs;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate(values);
    setFieldErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

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

        <form className="order-form" onSubmit={handleSubmit} noValidate>
          <div className="order-form__row">
            <div className="field">
              <label htmlFor="firstName">{t("form.firstName")}</label>
              <input
                  id="firstName"
                  value={values.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  aria-invalid={Boolean(fieldErrors.firstName)}
                  autoComplete="given-name"
              />
              {fieldErrors.firstName && <p className="field__error">{fieldErrors.firstName}</p>}
            </div>
            <div className="field">
              <label htmlFor="lastName">{t("form.lastName")}</label>
              <input
                  id="lastName"
                  value={values.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  aria-invalid={Boolean(fieldErrors.lastName)}
                  autoComplete="family-name"
              />
              {fieldErrors.lastName && <p className="field__error">{fieldErrors.lastName}</p>}
            </div>
          </div>
          <div className="field">
            <label htmlFor="email">{t("auth.email")}</label>
            <input
                id="email"
                type="email"
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={Boolean(fieldErrors.email)}
                autoComplete="email"
            />
            {fieldErrors.email && <p className="field__error">{fieldErrors.email}</p>}
          </div>
          <div className="field">
            <label htmlFor="phone">{t("form.phone")}</label>
            <input
                id="phone"
                type="tel"
                value={values.phone}
                onChange={(e) => update("phone", e.target.value)}
                aria-invalid={Boolean(fieldErrors.phone)}
                autoComplete="tel"
                placeholder={t("form.phonePlaceholder")}
            />
            {fieldErrors.phone && <p className="field__error">{fieldErrors.phone}</p>}
          </div>
          <div className="field">
            <label htmlFor="password">{t("auth.password")}</label>
            <input
                id="password"
                type="password"
                value={values.password}
                onChange={(e) => update("password", e.target.value)}
                aria-invalid={Boolean(fieldErrors.password)}
                autoComplete="new-password"
            />
            {fieldErrors.password && <p className="field__error">{fieldErrors.password}</p>}
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