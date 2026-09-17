import {Link} from "react-router-dom";
import {CURRENCY} from "../config";
import {useAuth} from "../context/AuthContext";
import {useLanguage} from "../context/LanguageContext";
import {getLocalized} from "../data/products";
import CanvasArt from "./CanvasArt";

export default function ProductCard({product}) {
    const {user} = useAuth();
    const {lang, t} = useLanguage();
    const title = getLocalized(product, "title", lang);
    const size = getLocalized(product, "size", lang);

    return (
        <article className="frame">
            <Link to={`/piece/${product.id}`} className="frame__mat" aria-label={`View ${title}`}>
                <CanvasArt palette={product.palette} image={product.image} title={title}/>
            </Link>
            <div className="frame__details">
                <h3 className="frame__title">
                    <Link to={`/piece/${product.id}`}>{title}</Link>
                </h3>
                <p className="frame__meta">
                    {t(`categories.${product.category}`)}, {size}
                </p>
                <div className="frame__row">
          <span className="frame__price">
            {CURRENCY}
              {product.price}
          </span>
                    <Link to={`/quick-order/${product.id}`} className="btn btn--small btn--gold">
                        {user ? t("product.order") : t("product.quickOrder")}
                    </Link>
                </div>
            </div>
        </article>
    );
}
