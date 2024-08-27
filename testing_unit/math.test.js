import {
    sum,
    subtract,
    sumAsync,
    subtractAsync,
    multiply,
    multiplyAsync,
    divition,
    divitionAsync,
} from "./math.js";

test("sum adds two numbers", () => {
    const result = sum(1, 2);
    const expected = 3;
    expect(result).toBe(expected);
});

test("subtract subtracts two numbers", () => {
    const result = subtract(1, 2);
    const expected = -1;
    expect(result).toBe(expected);
});

test("sumAsync adds two numbers", async () => {
    const result = await sumAsync(1, 2);
    const expected = 3;
    expect(result).toBe(expected);
});

test("subtractAsync subtract two numbers", async () => {
    const result = await subtractAsync(1, 2);
    const expected = -1;
    expect(result).toBe(expected);
});

test("multiply multiplies two numbers", () => {
    const result = multiply(5, 6);
    const expected = 30;
    expect(result).toBe(expected);
});

test("multiplyAsync multiplies two numbers", async () => {
    const result = await multiplyAsync(5, 6);
    const expected = 30;
    expect(result).toBe(expected);
});

test("divition divides two numbers", () => {
    const result = divition(30, 6);
    const expected = 5;
    expect(result).toBe(expected);
});

test("divitionAsync divides two numbers", async () => {
    const result = await divitionAsync(30, 5);
    const expected = 6;
    expect(result).toBe(expected);
});

// test("window", () => {
//     console.log(window);
// });

// async function test(title, callback) {
//     try {
//         await callback();
//         console.log(`✅ ${title}`);
//     } catch (error) {
//         console.log(`❌ ${title}`);
//         console.log(error);
//     }
// }

// function expect(actual) {
//     return {
//         toBe(expected) {
//             if (actual !== expected) {
//                 throw new Error(`${actual} is not equal to ${expected}`);
//             }
//         },
//         toEqual(expected) {},
//         toBeGreaterThan(expected) {},
//     };
// }
