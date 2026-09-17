import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <section className="empty-state">
      <h1>{t("notFound.title")}</h1>
      <p>{t("notFound.note")}</p>
      <Link to="/" className="btn btn--gold">
        {t("notFound.back")}
      </Link>
    </section>
  );
}
