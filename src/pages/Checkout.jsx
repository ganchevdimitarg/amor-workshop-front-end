import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import OrderForm from "../components/OrderForm";
import { CURRENCY } from "../config";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { getLocalized } from "../data/products";
import { sendOrderNotification } from "../utils/email";
import { makeId, saveOrder } from "../utils/storage";

export default function Checkout() {
  const { lines, total, clearCart } = useCart();
  const { user, updateProfile } = useAuth();
  const { lang, t } = useLanguage();
  const [placedOrder, setPlacedOrder] = useState(null);

  if (lines.length === 0 && !placedOrder) {
    return <Navigate to="/cart" replace />;
  }

  async function handleSubmit(values) {
    const order = {
      id: makeId("order"),
      createdAt: new Date().toISOString(),
      userId: user ? user.id : null,
      items: lines.map((line) => ({
        productId: line.productId,
        title: getLocalized(line.product, "title", lang),
        price: line.product.price,
        qty: line.qty,
      })),
      total,
      customer: values,
      status: "received",
    };

    saveOrder(order);
    await sendOrderNotification(order);
    if (user) {
      updateProfile({
        phone: values.phone,
        address: values.address,
        transportCompany: values.transportCompany,
      });
    }
    clearCart();
    setPlacedOrder(order);
  }

  if (placedOrder) {
    return (
      <section className="confirmation">
        <h1>{t("checkout.thanks", { name: placedOrder.customer.firstName })}</h1>
        <p>
          {t("checkout.received", {
            id: placedOrder.id,
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
          {user && (
            <Link to="/orders" className="btn btn--ghost">
              {t("checkout.viewHistory")}
            </Link>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="checkout">
      <h1>{t("checkout.title")}</h1>
      <div className="checkout__grid">
        <div className="checkout__summary">
          <h2>{t("checkout.summary")}</h2>
          <ul>
            {lines.map((line) => (
              <li key={line.productId}>
                <span>
                  {getLocalized(line.product, "title", lang)} × {line.qty}
                </span>
                <span>
                  {CURRENCY}
                  {line.lineTotal}
                </span>
              </li>
            ))}
          </ul>
          <div className="checkout__total">
            <span>{t("checkout.total")}</span>
            <span>
              {CURRENCY}
              {total}
            </span>
          </div>
        </div>
        <div className="checkout__form">
          <h2>{t("checkout.shipping")}</h2>
          <OrderForm
            initialValues={{
              firstName: user?.firstName || "",
              lastName: user?.lastName || "",
              phone: user?.phone || "",
              address: user?.address || "",
              transportCompany: user?.transportCompany || "",
              email: user?.email || "",
            }}
            lockEmail={Boolean(user)}
            submitLabel={t("checkout.placeOrder")}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
}
