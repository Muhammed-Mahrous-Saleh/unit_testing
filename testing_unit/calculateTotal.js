// This method calculates the total price of items in a shopping cart
// It considers item prices, quantities, discounts, taxes, and shipping costs.

export function calculateTotal(
    cart,
    discountCode,
    taxRate = 0.1,
    shippingCost = 5.0
) {
    if (!Array.isArray(cart)) {
        throw new Error("Cart must be an array of items.");
    }

    // Calculate the subtotal
    let subtotal = cart.reduce((total, item) => {
        if (!item.price || !item.quantity) {
            throw new Error("Each item must have a price and quantity.");
        }
        return total + item.price * item.quantity;
    }, 0);

    // Apply discount if available
    const discount = applyDiscount(subtotal, discountCode);

    // Apply taxes
    const taxAmount = subtotal * taxRate;

    // Calculate final total including shipping cost
    const total = subtotal - discount + taxAmount + shippingCost;

    return parseFloat(total.toFixed(2));
}

// Helper function to apply a discount
export function applyDiscount(subtotal, discountCode) {
    const discountCodes = {
        SUMMER10: 0.1,
        WELCOME5: 5.0,
    };

    if (discountCode && discountCodes[discountCode]) {
        const discount = discountCodes[discountCode];
        return typeof discount === "number" && discount < 1
            ? subtotal * discount
            : discount;
    }

    return 0;
}
