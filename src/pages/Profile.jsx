import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TRANSPORT_COMPANIES } from "../config";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

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
        setValues((prev) => ({ ...prev, [field]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();

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

            <form className="order-form profile-form" onSubmit={handleSubmit}>
                <div className="order-form__row">
                    <div className="field">
                        <label htmlFor="firstName">{t("form.firstName")}</label>
                        <input
                            id="firstName"
                            value={values.firstName}
                            onChange={(e) => update("firstName", e.target.value)}
                            disabled={!editing}
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="lastName">{t("form.lastName")}</label>
                        <input
                            id="lastName"
                            value={values.lastName}
                            onChange={(e) => update("lastName", e.target.value)}
                            disabled={!editing}
                            required
                        />
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
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="field">
                    <label htmlFor="phone">{t("form.phone")}</label>
                    <input
                        id="phone"
                        value={values.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        disabled={!editing}
                        autoComplete="tel"
                        placeholder={t("form.phonePlaceholder")}
                    />
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