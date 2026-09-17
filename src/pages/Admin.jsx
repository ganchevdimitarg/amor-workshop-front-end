import {Link} from "react-router-dom";
import {CURRENCY} from "../config";
import {useLanguage} from "../context/LanguageContext";
import {getOrders} from "../utils/storage";

export default function Admin() {
    const {t} = useLanguage();
    const orders = getOrders();

    return (
        <section className="admin">
            <h1>{t("admin.title")}</h1>
            <p className="admin__note">{t("admin.note")}</p>

            <div className="profile-form__actions">
                <Link to="/admin/products" className="btn btn--gold">
                    {t("admin.manageProducts")}
                </Link>
            </div>

            {orders.length === 0 ? (
                <p>{t("admin.empty")}</p>
            ) : (
                <div className="admin__table-wrap">
                    <table className="admin__table">
                        <thead>
                        <tr>
                            <th>{t("admin.colOrder")}</th>
                            <th>{t("admin.colCustomer")}</th>
                            <th>{t("admin.colContact")}</th>
                            <th>{t("admin.colAddress")}</th>
                            <th>{t("admin.colCourier")}</th>
                            <th>{t("admin.colTotal")}</th>
                            <th>{t("admin.colStatus")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="admin__row">
                                <td>
                                    <Link to={`/admin/orders/${order.id}`} className="admin__order-link">
                                        <div>{order.id}</div>
                                        <div className="admin__muted">{new Date(order.createdAt).toLocaleString()}</div>
                                    </Link>
                                </td>
                                <td>
                                    {order.customer.firstName} {order.customer.lastName}
                                </td>
                                <td>
                                    <div>{order.customer.phone}</div>
                                    <div className="admin__muted">{order.customer.email || "—"}</div>
                                </td>
                                <td>{order.customer.address}</td>
                                <td>{order.customer.transportCompany}</td>
                                <td>
                                    {CURRENCY}
                                    {order.total}
                                </td>
                                <td>
                                    <span className="status-badge">{t(`status.${order.status}`)}</span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}
