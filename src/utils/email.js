import emailjs from "@emailjs/browser";
import {
    ADMIN_EMAIL,
    CURRENCY,
    EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
} from "../config";

function summarizeItems(items) {
    return items
        .map((item) => `${item.title} × ${item.qty} — ${CURRENCY}${item.price * item.qty}`)
        .join("\n");
}

// Sends the admin a notification for a new order. Requires a free EmailJS
// account (see README.md). Until it's configured, this simply logs the order
// to the console — the order itself is always saved locally either way, so
// nothing is lost while you finish setup.
export async function sendOrderNotification(order) {
    const payload = {
        to_email: ADMIN_EMAIL,
        order_id: order.id,
        idempotency_key: order.idempotencyKey,
        order_date: new Date(order.createdAt).toLocaleString(),
        customer_name: `${order.customer.firstName} ${order.customer.lastName}`,
        customer_phone: order.customer.phone,
        customer_email: order.customer.email || "(not provided)",
        customer_address: order.customer.address,
        transport_company: order.customer.transportCompany,
        items_summary: summarizeItems(order.items),
        order_total: `${CURRENCY}${order.total}`,
    };

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        console.warn(
            "[Linden Studio] EmailJS isn't configured yet, so no email was sent. " +
            "The order below was still saved. Fill in the EMAILJS_* values in src/config.js to enable live email.",
            payload
        );
        return {sent: false, reason: "not_configured"};
    }

    try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload, {
            publicKey: EMAILJS_PUBLIC_KEY,
        });
        return {sent: true};
    } catch (error) {
        console.error("[Linden Studio] Order email failed to send:", error);
        return {sent: false, reason: "send_failed", error};
    }
}
