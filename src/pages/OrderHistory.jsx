import { Link } from "react-router-dom";
import { CURRENCY } from "../config";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { getOrdersForUser } from "../utils/storage";

export default function OrderHistory() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const orders = getOrdersForUser(user.id);

  if (orders.length === 0) {
    return (
      <section className="empty-state">
        <h1>{t("orderHistory.emptyTitle")}</h1>
        <p>{t("orderHistory.emptyNote")}</p>
        <Link to="/" className="btn btn--gold">
          {t("orderHistory.browse")}
        </Link>
      </section>
    );
  }

  return (
    <section className="order-history">
      <h1>{t("orderHistory.title")}</h1>
      <ul className="order-history__list">
        {orders.map((order) => (
          <li key={order.id} className="order-card">
            <div className="order-card__head">
              <div>
                <p className="order-card__id">{order.id}</p>
                <p className="order-card__date">{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <span className="status-badge">{t(`status.${order.status}`)}</span>
            </div>
            <ul className="order-card__items">
              {order.items.map((item) => (
                <li key={item.productId}>
                  <span>
                    {item.title} × {item.qty}
                  </span>
                  <span>
                    {CURRENCY}
                    {item.price * item.qty}
                  </span>
                </li>
              ))}
            </ul>
            <div className="order-card__foot">
              <span>{t("orderHistory.shippingVia", { transport: order.customer.transportCompany })}</span>
              <span className="order-card__total">
                {CURRENCY}
                {order.total}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
