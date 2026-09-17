import { useState } from "react";
import { TRANSPORT_COMPANIES } from "../config";
import { useLanguage } from "../context/LanguageContext";

const EMPTY = {
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  transportCompany: "",
  email: "",
};

export default function OrderForm({ initialValues, lockEmail = false, submitLabel, onSubmit }) {
  const { t } = useLanguage();
  const [values, setValues] = useState({ ...EMPTY, ...initialValues });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate(v) {
    const errs = {};
    if (!v.firstName.trim()) errs.firstName = t("form.errFirstName");
    if (!v.lastName.trim()) errs.lastName = t("form.errLastName");
    if (!v.phone.trim()) {
      errs.phone = t("form.errPhone");
    } else if (!/^[0-9+\s().-]{7,}$/.test(v.phone.trim())) {
      errs.phone = t("form.errPhoneInvalid");
    }
    if (!v.address.trim()) errs.address = t("form.errAddress");
    if (!v.transportCompany) errs.transportCompany = t("form.errTransport");
    if (v.email.trim() && !/^\S+@\S+\.\S+$/.test(v.email.trim())) {
      errs.email = t("form.errEmail");
    }
    return errs;
  }

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="order-form" onSubmit={handleSubmit} noValidate>
      <div className="order-form__row">
        <div className="field">
          <label htmlFor="firstName">{t("form.firstName")}</label>
          <input
            id="firstName"
            value={values.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            aria-invalid={Boolean(errors.firstName)}
            autoComplete="given-name"
          />
          {errors.firstName && <p className="field__error">{errors.firstName}</p>}
        </div>
        <div className="field">
          <label htmlFor="lastName">{t("form.lastName")}</label>
          <input
            id="lastName"
            value={values.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            aria-invalid={Boolean(errors.lastName)}
            autoComplete="family-name"
          />
          {errors.lastName && <p className="field__error">{errors.lastName}</p>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="phone">{t("form.phone")}</label>
        <input
          id="phone"
          type="tel"
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          aria-invalid={Boolean(errors.phone)}
          autoComplete="tel"
          placeholder={t("form.phonePlaceholder")}
        />
        {errors.phone && <p className="field__error">{errors.phone}</p>}
      </div>

      <div className="field">
        <label htmlFor="address">{t("form.address")}</label>
        <textarea
          id="address"
          rows={3}
          value={values.address}
          onChange={(e) => update("address", e.target.value)}
          aria-invalid={Boolean(errors.address)}
          autoComplete="street-address"
          placeholder={t("form.addressPlaceholder")}
        />
        {errors.address && <p className="field__error">{errors.address}</p>}
      </div>

      <div className="field">
        <label htmlFor="transportCompany">{t("form.transport")}</label>
        <select
          id="transportCompany"
          value={values.transportCompany}
          onChange={(e) => update("transportCompany", e.target.value)}
          aria-invalid={Boolean(errors.transportCompany)}
        >
          <option value="">{t("form.chooseCourier")}</option>
          {TRANSPORT_COMPANIES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {errors.transportCompany && <p className="field__error">{errors.transportCompany}</p>}
      </div>

      <div className="field">
        <label htmlFor="email">
          {t("form.email")} {lockEmail ? "" : t("form.emailOptional")}
        </label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          autoComplete="email"
          disabled={lockEmail}
        />
        {errors.email && <p className="field__error">{errors.email}</p>}
      </div>

      <button type="submit" className="btn btn--gold btn--full" disabled={submitting}>
        {submitting ? t("form.submitting") : submitLabel}
      </button>
    </form>
  );
}
