import range from "./range.js";

for (const value of range(0, 16, 2)) {
    console.log("value", value);
}

console.log([...range(1, 10, 1)]);
try {
    // test when range is 0 "validation 😊"
    console.log([...range(1, 10, 0)]);
} catch (e) {
    console.error(e);
}
console.log([...range(10, 1, -1)]);
console.log([...range(10, 1, -2)]);
const iterator = range(1, 10, 1);
console.log(iterator.next());
console.log(iterator.next());
