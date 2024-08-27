export const sum = (a, b) => a + b;

export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;
export const divition = (a, b) => a / b;

export const sumAsync = async (a, b) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(a + b);
        }, 500);
    });

export const subtractAsync = async (a, b) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(a - b);
        }, 500);
    });

export const multiplyAsync = async (a, b) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(a * b);
        }, 500);
    });
export const divitionAsync = async (a, b) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(a / b);
        }, 500);
    });
