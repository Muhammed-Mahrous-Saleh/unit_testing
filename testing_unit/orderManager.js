export class OrderManager {
    constructor() {
        this.orders = {};
        this.orderIdCounter = 1;
    }

    createOrder(customerName, items, shippingAddress) {
        if (!customerName || typeof customerName !== "string") {
            throw new Error("Customer name is required and must be a string.");
        }
        if (!Array.isArray(items) || items.length === 0) {
            throw new Error("Items must be a non-empty array.");
        }
        if (!shippingAddress || typeof shippingAddress !== "string") {
            throw new Error(
                "Shipping address is required and must be a string."
            );
        }

        const orderId = this.orderIdCounter++;
        const order = {
            orderId,
            customerName,
            items,
            shippingAddress,
            status: "Pending",
            createdAt: new Date(),
        };
        this.orders[orderId] = order;
        return orderId;
    }

    updateOrderStatus(orderId, status) {
        const order = this.getOrder(orderId);
        const validStatuses = ["Pending", "Shipped", "Delivered", "Canceled"];
        if (!validStatuses.includes(status)) {
            throw new Error("Invalid order status.");
        }
        order.status = status;
        order.updatedAt = new Date();
    }

    calculateTotal(orderId, taxRate = 0.1, shippingCost = 10.0) {
        const order = this.getOrder(orderId);
        let subtotal = order.items.reduce((total, item) => {
            if (!item.price || !item.quantity) {
                throw new Error("Each item must have a price and quantity.");
            }
            return total + item.price * item.quantity;
        }, 0);

        const taxAmount = subtotal * taxRate;
        const total = subtotal + taxAmount + shippingCost;
        return parseFloat(total.toFixed(2));
    }

    applyDiscount(orderId, discountCode) {
        const order = this.getOrder(orderId);
        const discount = this.getDiscountAmount(order, discountCode);
        order.discountApplied = discountCode;
        order.discountAmount = discount;
    }

    getDiscountAmount(order, discountCode) {
        const discountCodes = {
            SAVE10: 0.1,
            FLAT50: 50.0,
        };
        const discount = discountCodes[discountCode] || 0;
        let subtotal = order.items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
        return typeof discount === "number" && discount < 1
            ? parseFloat((subtotal * discount).toFixed(2))
            : parseFloat(discount.toFixed(2));
    }

    generateOrderSummary(orderId) {
        const order = this.getOrder(orderId);
        const total = this.calculateTotal(orderId);
        const discountAmount = order.discountAmount || 0;
        const finalTotal = total - discountAmount;
        return {
            orderId: order.orderId,
            customerName: order.customerName,
            items: order.items,
            status: order.status,
            total,
            discountAmount,
            finalTotal: parseFloat(finalTotal.toFixed(2)),
            createdAt: order.createdAt,
            updatedAt: order.updatedAt || null,
        };
    }

    getOrder(orderId) {
        const order = this.orders[orderId];
        if (!order) {
            throw new Error("Order not found.");
        }
        return order;
    }
}
