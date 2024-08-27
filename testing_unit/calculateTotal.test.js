import { calculateTotal } from "./calculateTotal.js";

describe("calculateTotal", () => {
    test("should calculate the correct total with a percentage discount", () => {
        const cart = [
            { name: "Laptop", price: 1000, quantity: 1 },
            { name: "Mouse", price: 25, quantity: 2 },
            { name: "Keyboard", price: 75, quantity: 1 },
        ];
        const discountCode = "SUMMER10";
        const result = calculateTotal(cart, discountCode);
        expect(result).toBe(1130);
    });

    test("should calculate the correct total with a fixed discount", () => {
        const cart = [
            { name: "Laptop", price: 1000, quantity: 1 },
            { name: "Mouse", price: 25, quantity: 2 },
            { name: "Keyboard", price: 75, quantity: 1 },
        ];
        const discountCode = "WELCOME5";
        const result = calculateTotal(cart, discountCode);
        expect(result).toBe(1237.5);
    });

    test("should calculate the correct total without any discount", () => {
        const cart = [
            { name: "Laptop", price: 1000, quantity: 1 },
            { name: "Mouse", price: 25, quantity: 2 },
            { name: "Keyboard", price: 75, quantity: 1 },
        ];
        const result = calculateTotal(cart);
        expect(result).toBe(1242.5);
    });

    test("should throw an error if cart is not an array", () => {
        expect(() => calculateTotal(null)).toThrow(
            "Cart must be an array of items."
        );
    });

    test("should throw an error if an item is missing price or quantity", () => {
        const cart = [
            { name: "Laptop", price: 1000, quantity: 1 },
            { name: "Mouse", price: 25 },
        ];
        expect(() => calculateTotal(cart)).toThrow(
            "Each item must have a price and quantity."
        );
    });

    test("should calculate total with custom tax rate and shipping cost", () => {
        const cart = [
            { name: "Laptop", price: 1000, quantity: 1 },
            { name: "Mouse", price: 25, quantity: 2 },
        ];
        const result = calculateTotal(cart, "", 0.05, 10);
        expect(result).toBe(1112.5);
    });
});
