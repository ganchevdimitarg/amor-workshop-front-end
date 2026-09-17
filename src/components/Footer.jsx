import { SHOP_NAME } from "../config";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__brand">{SHOP_NAME}</p>
        <p className="site-footer__tagline">{t("footer.tagline")}</p>
        <p className="site-footer__note">{t("footer.note")}</p>
      </div>
    </footer>
  );
}
