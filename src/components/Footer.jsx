import { Link } from "react-router-dom";
import { SHOP_NAME } from "../config";
import { useLanguage } from "../context/LanguageContext";

const legalLinks = {
    bg: {
        privacy: "Политика за поверителност",
        terms: "Общи условия",
        shipping: "Доставка и връщане",
    },
    en: {
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        shipping: "Shipping and Returns",
    },
};

export default function Footer() {
    const { lang, t } = useLanguage();
    const links = legalLinks[lang] ?? legalLinks.en;

    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <p className="site-footer__brand">{SHOP_NAME}</p>
                <p className="site-footer__tagline">{t("footer.tagline")}</p>
                <p className="site-footer__note">{t("footer.note")}</p>
                <nav className="site-footer__links" aria-label="Legal pages">
                    <Link to="/privacy-policy">{links.privacy}</Link>
                    <Link to="/terms-of-service">{links.terms}</Link>
                    <Link to="/shipping-and-returns">{links.shipping}</Link>
                </nav>
            </div>
        </footer>
    );
}