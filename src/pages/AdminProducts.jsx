import { Link } from "react-router-dom";
import CanvasArt from "../components/CanvasArt";
import { CURRENCY } from "../config";
import { useLanguage } from "../context/LanguageContext";
import { getLocalized, getProducts } from "../data/products";

export default function AdminProducts() {
    const { lang, t } = useLanguage();
    const products = getProducts();

    return (
        <section className="admin">
            <h1>{t("admin.productsTitle")}</h1>
            <p className="admin__note">{t("admin.productsNote")}</p>

            <div className="gallery__grid">
                {products.map((product) => {
                    const title = getLocalized(product, "title", lang);
                    const size = getLocalized(product, "size", lang);

                    return (
                        <article key={product.id} className="frame">
                            <Link to={`/piece/${product.id}`} className="frame__mat" aria-label={`View ${title}`}>
                                <CanvasArt palette={product.palette} image={product.image} title={title} />
                            </Link>

                            <div className="frame__details">
                                <h3 className="frame__title">{title}</h3>
                                <p className="frame__meta">
                                    {t(`categories.${product.category}`)}, {size}
                                </p>
                                <div className="frame__row">
                  <span className="frame__price">
                    {CURRENCY}
                      {product.price}
                  </span>
                                    <Link to={`/admin/products/${product.id}`} className="btn btn--small btn--gold">
                                        {t("admin.editProduct")}
                                    </Link>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}