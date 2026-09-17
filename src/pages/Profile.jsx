import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TRANSPORT_COMPANIES } from "../config";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9\s().-]{7,20}$/;

export default function Profile() {
    const { user, updateProfile, deleteProfile } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        transportCompany: "",
    });
    const [editing, setEditing] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [errorCode, setErrorCode] = useState("");
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!user) return;

        setValues({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
            transportCompany: user.transportCompany || "",
        });
    }, [user]);

    function update(field, value) {
        setSaved(false);
        setErrorCode("");
        setFieldErrors((prev) => ({ ...prev, [field]: "" }));
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

        return errs;
    }

    function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validate(values);
        setFieldErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        try {
            updateProfile(values);
            setEditing(false);
            setSaved(true);
        } catch (err) {
            setErrorCode(err.message);
        }
    }

    function handleCancel() {
        setValues({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
            transportCompany: user.transportCompany || "",
        });
        setEditing(false);
        setFieldErrors({});
        setErrorCode("");
        setSaved(false);
    }

    function handleDelete() {
        const confirmed = window.confirm(t("profile.deleteConfirm"));
        if (!confirmed) return;

        deleteProfile();
        navigate("/");
    }

    return (
        <section className="profile-page">
            <div className="profile-page__head">
                <div>
                    <h1>{t("profile.title")}</h1>
                    <p className="profile-page__note">{t("profile.note")}</p>
                </div>

                {!editing && (
                    <button type="button" className="btn btn--gold" onClick={() => setEditing(true)}>
                        {t("profile.edit")}
                    </button>
                )}
            </div>

            {errorCode && (
                <p className="form-error" role="alert">
                    {t(`errors.${errorCode}`)}
                </p>
            )}

            {saved && (
                <p className="form-success" role="status">
                    {t("profile.saved")}
                </p>
            )}

            <form className="order-form profile-form" onSubmit={handleSubmit} noValidate>
                <div className="order-form__row">
                    <div className="field">
                        <label htmlFor="firstName">{t("form.firstName")}</label>
                        <input
                            id="firstName"
                            value={values.firstName}
                            onChange={(e) => update("firstName", e.target.value)}
                            disabled={!editing}
                            aria-invalid={Boolean(fieldErrors.firstName)}
                        />
                        {fieldErrors.firstName && <p className="field__error">{fieldErrors.firstName}</p>}
                    </div>

                    <div className="field">
                        <label htmlFor="lastName">{t("form.lastName")}</label>
                        <input
                            id="lastName"
                            value={values.lastName}
                            onChange={(e) => update("lastName", e.target.value)}
                            disabled={!editing}
                            aria-invalid={Boolean(fieldErrors.lastName)}
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
                        disabled={!editing}
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
                        disabled={!editing}
                        aria-invalid={Boolean(fieldErrors.phone)}
                        autoComplete="tel"
                        placeholder={t("form.phonePlaceholder")}
                    />
                    {fieldErrors.phone && <p className="field__error">{fieldErrors.phone}</p>}
                </div>

                <div className="field">
                    <label htmlFor="address">{t("form.address")}</label>
                    <textarea
                        id="address"
                        value={values.address}
                        onChange={(e) => update("address", e.target.value)}
                        disabled={!editing}
                        placeholder={t("form.addressPlaceholder")}
                        rows="4"
                    />
                </div>

                <div className="field">
                    <label htmlFor="transportCompany">{t("form.transport")}</label>
                    <select
                        id="transportCompany"
                        value={values.transportCompany}
                        onChange={(e) => update("transportCompany", e.target.value)}
                        disabled={!editing}
                    >
                        <option value="">{t("form.chooseCourier")}</option>
                        {TRANSPORT_COMPANIES.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                {editing && (
                    <div className="profile-form__actions">
                        <button type="submit" className="btn btn--gold">
                            {t("profile.save")}
                        </button>
                        <button type="button" className="btn btn--ghost" onClick={handleCancel}>
                            {t("profile.cancel")}
                        </button>
                    </div>
                )}
            </form>

            <div className="profile-danger">
                <h2>{t("profile.dangerTitle")}</h2>
                <p>{t("profile.dangerNote")}</p>
                <button type="button" className="btn profile-danger__button" onClick={handleDelete}>
                    {t("profile.delete")}
                </button>
            </div>
        </section>
    );
}