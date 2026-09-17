import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CanvasArt from "../components/CanvasArt";
import ProductCard from "../components/ProductCard";
import { useLanguage } from "../context/LanguageContext";
import { getLocalized, getProducts } from "../data/products";

export default function Home() {
  const { lang, t } = useLanguage();
  const [products, setProducts] = useState(() => getProducts());
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const featured = products[featuredIndex] || products[0];
  const featuredTitle = featured ? getLocalized(featured, "title", lang) : "";

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    if (products.length === 0) return undefined;

    const timer = window.setInterval(() => {
      setFeaturedIndex((currentIndex) => (currentIndex + 1) % products.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [products.length]);

  if (!featured) return null;

  return (
      <div>
        <section className="hero">
          <div className="hero__text">
            <h1>{t("home.title")}</h1>
            <p>{t("home.subtitle")}</p>
            <div className="hero__actions">
              <a href="#gallery" className="btn btn--gold">
                {t("home.browse")}
              </a>
            </div>
          </div>
          <div className="hero__feature">
            <Link to={`/piece/${featured.id}`} className="hero__art" aria-label={`View ${featuredTitle}`}>
              <CanvasArt palette={featured.palette} image={featured.image} title={featuredTitle} large />
            </Link>
            <Link to={`/piece/${featured.id}`} className="btn btn--ghost hero__details-btn">
              {t("home.quickOrderCta")}
            </Link>
          </div>
        </section>

        <section id="gallery" className="gallery">
          <div className="gallery__heading">
            <h2>{t("home.galleryHeading")}</h2>
            <p>{t("home.galleryNote")}</p>
          </div>
          <div className="gallery__grid">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
  );
}