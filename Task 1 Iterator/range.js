/**
 * Generates an iterator that yields a sequence of numbers from `start` to `end` (exclusive) with a given `step`.
 *
 * @param {number} start - The starting value of the sequence.
 * @param {number} end - The end value of the sequence (exclusive).
 * @param {number} step - The step/increment value for the sequence.
 * @returns {Object} An iterator object that conforms to the iterable protocol.
 *
 * @example
 * const rangeIterator = range(0, 10, 2);
 * for (const value of rangeIterator) {
 *     console.log(value); // Outputs 0, 2, 4, 6, 8
 * }
 *
 * @example
 * const rangeIterator = range(1, 5, 1);
 * console.log([...rangeIterator]); // Outputs [1, 2, 3, 4]
 *
 * @example
 * const rangeIterator = range(5, 1, -1);
 * console.log([...rangeIterator]); // Outputs [5, 4, 3, 2]
 */

export default function* range(start, end, step = 1) {
    if (step > 0) {
        for (let i = start; i < end; i += step) {
            yield i;
        }
    } else if (step < 0) {
        for (let i = start; i > end; i += step) {
            yield i;
        }
    } else {
        throw "step value can't be zero.";
    }

    return { value: undefined, done: true };
}

///////////////////////////////////
// using Symbol.iterator

// export default function range(start, end, step) {
//     let index = start;
//     return {
//         next() {
//             if(step > 0){

//             if (index < end) {
//                 const result = {
//                     done: false,
//                     value: index,
//                 };
//                 index += step;
//                 return result;
//             } else {
//                 return {
//                     done: true,
//                     value: undefined,
//                 };
//             }
//         }else if (step < 0){
//             if (index > end) {
//                 const result = {
//                     done: false,
//                     value: index,
//                 };
//                 index += step;
//                 return result;
//             } else {
//                 return {
//                     done: true,
//                     value: undefined,
//                 };
//             }
//         }else{
//             throw("step value can't be zero.")
//         }
//         },

//         [Symbol.iterator]() {
//             return this;
//         },
//     };
// }
