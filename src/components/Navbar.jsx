import {useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {SHOP_NAME} from "../config";
import {useAuth} from "../context/AuthContext";
import {useCart} from "../context/CartContext";
import {useLanguage} from "../context/LanguageContext";
import {LANGUAGES} from "../i18n/translations";

export default function Navbar() {
    const {user, isAdmin, logout} = useAuth();
    const {itemCount} = useCart();
    const {lang, setLang, t} = useLanguage();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        setOpen(false);
        navigate("/");
    }

    return (
        <header className="site-header">
            <div className="site-header__inner">
                <Link to="/" className="brand" onClick={() => setOpen(false)}>
                    <img className="brand__logo" src="/logo.jpg" alt="Handmade Amor Workshop logo" />
                    <span className="brand__name">{SHOP_NAME}</span>
                </Link>

                <button
                    className="nav-toggle"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    <span/>
                    <span/>
                    <span/>
                </button>

                <nav className={`site-nav${open ? " site-nav--open" : ""}`}>
                    <NavLink to="/" end onClick={() => setOpen(false)}>
                        {t("nav.gallery")}
                    </NavLink>

                    {!isAdmin && (
                        <NavLink to="/cart" onClick={() => setOpen(false)}>
                            {t("nav.cart")}
                            {itemCount > 0 ? ` (${itemCount})` : ""}
                        </NavLink>
                    )}

                    {user ? (
                        <>
                            {!isAdmin && (
                                <>
                                    <NavLink to="/orders" onClick={() => setOpen(false)}>
                                        {t("nav.orders")}
                                    </NavLink>
                                    <NavLink to="/profile" onClick={() => setOpen(false)}>
                                        {t("nav.profile")}
                                    </NavLink>
                                </>
                            )}

                            {isAdmin && (
                                <NavLink to="/admin" onClick={() => setOpen(false)}>
                                    {t("nav.admin")}
                                </NavLink>
                            )}

                            <span className="site-nav__name">{t("nav.greeting", {name: user.firstName})}</span>
                            <button className="link-button" onClick={handleLogout}>
                                {t("nav.logout")}
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login" onClick={() => setOpen(false)}>
                            {t("nav.login")}
                        </NavLink>
                    )}

                    <div className="lang-switch" role="group" aria-label="Language">
                        {LANGUAGES.map((option) => (
                            <button
                                key={option.code}
                                type="button"
                                className={`lang-switch__btn${lang === option.code ? " lang-switch__btn--active" : ""}`}
                                aria-pressed={lang === option.code}
                                onClick={() => setLang(option.code)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </nav>
            </div>
        </header>
    );
}
