import { minMax } from "./minMax";

test("minMax returns min and max values", () => {
    const myArr = [10, 20, 50, 102, 3, 9, 5, 80, 78, 90];
    const result = minMax(...myArr);
    const expected = [3, 102];
    expect(result).toEqual(expected);
});
