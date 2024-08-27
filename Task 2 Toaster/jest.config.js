/**  @type {import('jest').Config} */

const config = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(t|j)sx?$": "@swc/jest",
    },
    setupFilesAfterEnv: ["./testSetup.js"],
};

export default config;
