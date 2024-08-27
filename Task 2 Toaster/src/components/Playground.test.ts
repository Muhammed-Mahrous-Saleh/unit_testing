// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { describe, it, expect, test } from "vitest";
import { ToastContainer } from "./ToastContainer";

test("Playground", () => {
    expect(true).toBe(true);
});

describe("ToastContainer", () => {
    it("renders without crashing", () => {
        render(<ToastContainer />);
        expect(screen.getByRole("alert")).toBeInTheDocument();
    });
});
