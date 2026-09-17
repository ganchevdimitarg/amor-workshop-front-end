import {useState} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import CanvasArt from "../components/CanvasArt";
import {CURRENCY} from "../config";
import {useAuth} from "../context/AuthContext";
import {useCart} from "../context/CartContext";
import {useLanguage} from "../context/LanguageContext";
import {getLocalized, getProductById} from "../data/products";

export default function ProductDetail() {
    const {id} = useParams();
    const product = getProductById(id);
    const {isAdmin} = useAuth();
    const {addToCart} = useCart();
    const {lang, t} = useLanguage();
    const [qty, setQty] = useState(1);
    const [justAdded, setJustAdded] = useState(false);

    if (!product) return <Navigate to="/" replace/>;

    const title = getLocalized(product, "title", lang);
    const medium = getLocalized(product, "medium", lang);
    const size = getLocalized(product, "size", lang);
    const description = getLocalized(product, "description", lang);

    function handleAddToCart() {
        addToCart(product.id, qty);
        setJustAdded(true);
        window.setTimeout(() => setJustAdded(false), 1600);
    }

    return (
        <section className="piece">
            <div className="piece__art">
                <CanvasArt palette={product.palette} image={product.image} title={title} large/>
            </div>
            <div className="piece__info">
                <p className="piece__category">{t(`categories.${product.category}`)}</p>
                <h1>{title}</h1>
                <p className="piece__price">
                    {CURRENCY}
                    {product.price}
                </p>
                <p className="piece__description">{description}</p>
                <p className="piece__spec">
                    {medium}, {size}
                </p>

                <div className="piece__timeline" aria-label={t("product.timelineLabel")}>
                    <p>{t("product.productionTime")}</p>
                    <p>{t("product.deliveryTime")}</p>
                </div>

                {isAdmin ? (
                    <Link to={`/admin/products/${product.id}`} className="btn btn--gold">
                        {t("admin.editProduct")}
                    </Link>
                ) : (
                    <>
                        <div className="piece__buy">
                            <div className="qty-stepper">
                                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}
                                        aria-label="Decrease quantity">
                                    −
                                </button>
                                <span>{qty}</span>
                                <button type="button" onClick={() => setQty((q) => q + 1)}
                                        aria-label="Increase quantity">
                                    +
                                </button>
                            </div>
                            <button
                                type="button"
                                className={`btn btn--gold${justAdded ? " btn--pulse" : ""}`}
                                onClick={handleAddToCart}
                            >
                                {justAdded ? t("product.added") : t("product.addToCart")}
                            </button>
                        </div>

                        <Link to={`/quick-order/${product.id}`} className="piece__quick-link">
                            {t("product.quickLink")}
                        </Link>
                    </>
                )}
            </div>
        </section>
    );
}
