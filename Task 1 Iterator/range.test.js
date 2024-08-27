import range from "./range.js";
test("range between two numbers includes first and excludes second", () => {
    const result = [...range(1, 5)];
    const expected = [1, 2, 3, 4];
    expect(result).toStrictEqual(expected);
});

test("range between two numbers with 2 steps", () => {
    const result = [...range(1, 10, 2)];
    const expected = [1, 3, 5, 7, 9];
    expect(result).toStrictEqual(expected);
});

test("range between two numbers with negative 2 steps", () => {
    const result = [...range(10, 1, -2)];
    const expected = [10, 8, 6, 4, 2];
    expect(result).toStrictEqual(expected);
});
