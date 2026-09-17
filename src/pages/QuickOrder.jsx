import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import CanvasArt from "../components/CanvasArt";
import OrderForm from "../components/OrderForm";
import { CURRENCY } from "../config";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { getLocalized, getProductById } from "../data/products";
import { sendOrderNotification } from "../utils/email";
import { makeId, saveOrder } from "../utils/storage";

export default function QuickOrder() {
  const { id } = useParams();
  const product = getProductById(id);
  const { user } = useAuth();
  const { lang, t } = useLanguage();
  const [qty, setQty] = useState(1);
  const [placedOrder, setPlacedOrder] = useState(null);

  if (!product) return <Navigate to="/" replace />;

  const title = getLocalized(product, "title", lang);
  const medium = getLocalized(product, "medium", lang);
  const size = getLocalized(product, "size", lang);

  async function handleSubmit(values) {
    const order = {
      id: makeId("order"),
      createdAt: new Date().toISOString(),
      userId: user ? user.id : null,
      items: [{ productId: product.id, title, price: product.price, qty }],
      total: product.price * qty,
      customer: values,
      status: "received",
    };
    saveOrder(order);
    await sendOrderNotification(order);
    setPlacedOrder(order);
  }

  if (placedOrder) {
    return (
      <section className="confirmation">
        <h1>{t("quickOrder.thanks", { name: placedOrder.customer.firstName })}</h1>
        <p>
          {t("quickOrder.received", {
            id: placedOrder.id,
            product: title,
            transport: placedOrder.customer.transportCompany,
          })}
        </p>
        <p className="confirmation__total">
          {t("checkout.totalLabel")} {CURRENCY}
          {placedOrder.total}
        </p>
        <div className="hero__actions">
          <Link to="/" className="btn btn--gold">
            {t("checkout.keepBrowsing")}
          </Link>
          {!user && (
            <Link to="/register" className="btn btn--ghost">
              {t("quickOrder.createAccount")}
            </Link>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="quick-order">
      <h1>{t("quickOrder.title")}</h1>
      <p className="quick-order__note">{t("quickOrder.note")}</p>

      <div className="quick-order__product">
        <CanvasArt palette={product.palette} title={title} />
        <div>
          <h2>{title}</h2>
          <p>
            {medium}, {size}
          </p>
          <div className="qty-stepper">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
              −
            </button>
            <span>{qty}</span>
            <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
              +
            </button>
          </div>
          <p className="quick-order__line-total">
            {CURRENCY}
            {product.price * qty}
          </p>
        </div>
      </div>

      <OrderForm
        initialValues={{
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          phone: user?.phone || "",
          address: user?.address || "",
          transportCompany: user?.transportCompany || "",
          email: user?.email || "",
        }}
        submitLabel={t("quickOrder.place")}
        onSubmit={handleSubmit}
      />

      <p className="quick-order__note">
        {t("quickOrder.loginNotePrefix")} <Link to="/login">{t("quickOrder.loginLink")}</Link>{" "}
        {t("quickOrder.or")} <Link to="/register">{t("quickOrder.registerLink")}</Link> {t("quickOrder.loginNoteSuffix")}
      </p>
    </section>
  );
}
