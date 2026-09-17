import { Link } from "react-router-dom";
import CanvasArt from "../components/CanvasArt";
import { CURRENCY } from "../config";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { getLocalized } from "../data/products";

export default function Cart() {
  const { lines, total, updateQty, removeFromCart } = useCart();
  const { lang, t } = useLanguage();

  if (lines.length === 0) {
    return (
      <section className="empty-state">
        <h1>{t("cart.emptyTitle")}</h1>
        <p>{t("cart.emptyNote")}</p>
        <Link to="/" className="btn btn--gold">
          {t("cart.browse")}
        </Link>
      </section>
    );
  }

  return (
    <section className="cart">
      <h1>{t("cart.title")}</h1>
      <ul className="cart__list">
        {lines.map((line) => {
          const title = getLocalized(line.product, "title", lang);
          return (
            <li className="cart__line" key={line.productId}>
              <Link to={`/piece/${line.productId}`} className="cart__art">
                <CanvasArt palette={line.product.palette} title={title} />
              </Link>
              <div className="cart__line-info">
                <Link to={`/piece/${line.productId}`} className="cart__line-title">
                  {title}
                </Link>
                <p className="cart__line-meta">
                  {CURRENCY}
                  {line.product.price} {t("cart.each")}
                </p>
                <button type="button" className="link-button" onClick={() => removeFromCart(line.productId)}>
                  {t("cart.remove")}
                </button>
              </div>
              <div className="qty-stepper">
                <button
                  type="button"
                  onClick={() => updateQty(line.productId, line.qty - 1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span>{line.qty}</span>
                <button
                  type="button"
                  onClick={() => updateQty(line.productId, line.qty + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <p className="cart__line-total">
                {CURRENCY}
                {line.lineTotal}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="cart__summary">
        <span>{t("cart.total")}</span>
        <span className="cart__total">
          {CURRENCY}
          {total}
        </span>
      </div>
      <Link to="/checkout" className="btn btn--gold btn--full">
        {t("cart.checkout")}
      </Link>
    </section>
  );
}
