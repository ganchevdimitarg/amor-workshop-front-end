import { Link, Navigate, useParams } from "react-router-dom";
import { CURRENCY } from "../config";
import { useLanguage } from "../context/LanguageContext";
import { getOrderById } from "../utils/storage";

export default function OrderDetail() {
    const { id } = useParams();
    const { t } = useLanguage();
    const order = getOrderById(id);

    if (!order) {
        return <Navigate to="/admin" replace />;
    }

    return (
        <section className="confirmation order-detail">
            <h1>{t("orderDetail.title", { id: order.id })}</h1>

            <p>
                {t("checkout.received", {
                    id: order.id,
                    transport: order.customer.transportCompany,
                })}
            </p>

            <p className="order-card__date">{new Date(order.createdAt).toLocaleString()}</p>

            <div className="order-detail__block">
                <h2>{t("orderDetail.customer")}</h2>
                <p>
                    {order.customer.firstName} {order.customer.lastName}
                </p>
                <p>{order.customer.phone}</p>
                <p>{order.customer.email || "—"}</p>
                <p>{order.customer.address}</p>
            </div>

            <div className="order-detail__block">
                <h2>{t("checkout.summary")}</h2>
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
            </div>

            <p className="confirmation__total">
                {t("checkout.totalLabel")} {CURRENCY}
                {order.total}
            </p>

            <p>
                <span className="status-badge">{t(`status.${order.status}`)}</span>
            </p>

            <div className="hero__actions">
                <Link to="/admin" className="btn btn--ghost">
                    {t("orderDetail.backToAdmin")}
                </Link>
            </div>
        </section>
    );
}