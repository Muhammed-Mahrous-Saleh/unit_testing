import { useEffect, useState } from "react";
import { Toast } from "./Toast";
import { ToastType } from "../utils/types";
import { toastObservable } from "../utils/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
// export type InstanceType<T extends React.FC> = T & {

export function ToastContainer() {
    const [toasts, setToasts] = useState<ToastType[]>([]);

    const [parent] = useAutoAnimate();

    useEffect(() => {
        return toastObservable.subscribe((action) => {
            if (action.type === "DISMISS_ALL") {
                setToasts([]);
            } else if (action.type === "ADD_TOAST") {
                setToasts((prevToasts) => [...prevToasts, action.toast]);
            }
        });
    }, []);

    return (
        <div
            ref={parent}
            className="absolute bottom-0 end-0 p-4 space-y-2 w-full h-full justify-end pointer-events-none flex flex-col max-w-xs "
        >
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    id={toast.id}
                    message={toast.message}
                    variant={toast.variant}
                    onClose={() => {
                        setToasts((prevToasts) =>
                            prevToasts.filter((t) => t.id !== toast.id)
                        );
                    }}
                />
            ))}
        </div>
    );
}
