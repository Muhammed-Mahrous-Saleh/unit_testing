// @vitest-environment happy-dom
import { test, expect, vi, describe } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { ToastContainer } from "./ToastContainer";
import { toastObservable } from "../utils/utils";
import { ToastAction } from "../utils/types";

// Mock the utils file to control the behavior of toastObservable
vi.mock("../utils/utils");

describe("ToastContainer component test", () => {
    test("renders toasts and removes them when dismissed", () => {
        // Mock the subscribe method of toastObservable
        const mockSubscribe = toastObservable.subscribe as unknown as vi.Mock;

        const addToastAction: ToastAction = {
            type: "ADD_TOAST",
            toast: {
                id: 1,
                message: "Toast message",
                variant: "success",
            },
        };

        const dismissAllAction: ToastAction = {
            type: "DISMISS_ALL",
        };

        // This will hold the callback passed to the subscribe function
        let subscriberCallback: (action: ToastAction) => void;
        mockSubscribe.mockImplementation(
            (callback: (action: ToastAction) => void) => {
                subscriberCallback = callback;
                return { unsubscribe: vi.fn() };
            }
        );

        // Render the ToastContainer component
        render(<ToastContainer />);

        // Simulate adding a toast
        act(() => {
            subscriberCallback(addToastAction);
        });

        // Assert that the toast is displayed
        expect(screen.getByText("Toast message")).toBeInTheDocument();

        // Simulate dismissing all toasts
        act(() => {
            subscriberCallback(dismissAllAction);
        });

        // Assert that the toast is removed
        expect(screen.queryByText("Toast message")).not.toBeInTheDocument();
    });
});
