import { OrderManager } from "./orderManager.js";

describe("OrderManager", () => {
    let orderManager;

    beforeEach(() => {
        orderManager = new OrderManager();
    });

    test("should create a new order", () => {
        const orderId = orderManager.createOrder(
            "Jane Doe",
            [{ name: "Book", price: 20, quantity: 2 }],
            "456 Elm St, City, Country"
        );

        const order = orderManager.getOrder(orderId);
        expect(order.customerName).toBe("Jane Doe");
        expect(order.items.length).toBe(1);
        expect(order.shippingAddress).toBe("456 Elm St, City, Country");
    });

    test("should throw an error when creating an order with invalid customer name", () => {
        expect(() => orderManager.createOrder("", [], "123 Main St")).toThrow(
            "Customer name is required and must be a string."
        );
    });

    test("should update order status", () => {
        const orderId = orderManager.createOrder(
            "John Doe",
            [{ name: "Laptop", price: 1000, quantity: 1 }],
            "123 Main St, City, Country"
        );

        orderManager.updateOrderStatus(orderId, "Shipped");
        const order = orderManager.getOrder(orderId);
        expect(order.status).toBe("Shipped");
    });

    test("should throw an error when updating to an invalid order status", () => {
        const orderId = orderManager.createOrder(
            "John Doe",
            [{ name: "Laptop", price: 1000, quantity: 1 }],
            "123 Main St, City, Country"
        );

        expect(() =>
            orderManager.updateOrderStatus(orderId, "InvalidStatus")
        ).toThrow("Invalid order status.");
    });

    test("should calculate the total cost of an order", () => {
        const orderId = orderManager.createOrder(
            "John Doe",
            [
                { name: "Laptop", price: 1000, quantity: 1 },
                { name: "Mouse", price: 25, quantity: 2 },
            ],
            "123 Main St, City, Country"
        );

        const total = orderManager.calculateTotal(orderId);
        expect(total).toBe(1165);
    });

    test("should apply a discount to the order", () => {
        const orderId = orderManager.createOrder(
            "John Doe",
            [
                { name: "Laptop", price: 1000, quantity: 1 },
                { name: "Mouse", price: 25, quantity: 2 },
            ],
            "123 Main St, City, Country"
        );

        orderManager.applyDiscount(orderId, "SAVE10");
        const summary = orderManager.generateOrderSummary(orderId);
        expect(summary.discountAmount).toBe(105);
        expect(summary.finalTotal).toBe(1060);
    });

    test("should generate an order summary", () => {
        const orderId = orderManager.createOrder(
            "John Doe",
            [
                { name: "Laptop", price: 1000, quantity: 1 },
                { name: "Mouse", price: 25, quantity: 2 },
            ],
            "123 Main St, City, Country"
        );

        orderManager.updateOrderStatus(orderId, "Shipped");
        orderManager.applyDiscount(orderId, "SAVE10");
        const summary = orderManager.generateOrderSummary(orderId);

        expect(summary.orderId).toBe(orderId);
        expect(summary.customerName).toBe("John Doe");
        expect(summary.status).toBe("Shipped");
        expect(summary.total).toBe(1165);
        expect(summary.discountAmount).toBe(105);
        expect(summary.finalTotal).toBe(1060);
    });

    test("should throw an error when trying to access a non-existent order", () => {
        expect(() => orderManager.getOrder(999)).toThrow("Order not found.");
    });
});
