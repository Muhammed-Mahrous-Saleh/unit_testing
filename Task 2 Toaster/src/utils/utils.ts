import { ToastAction, Observer } from "./types";

class Observable<T> {
    observers: Observer<T>[] = [];
    subscribe(observer: Observer<T>) {
        this.observers.push(observer);

        return () => {
            this.observers = this.observers.filter((o) => o !== observer);
        };
    }

    notify(data: T) {
        this.observers.forEach((obs) => obs(data));
    }
}

export const toastObservable = new Observable<ToastAction>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toast(message: string) {
    toastObservable.notify({
        type: "ADD_TOAST",
        toast: {
            id: Math.random(),
            message: message,
            variant: "default",
        },
    });
}

toast.success = (message: string) => {
    toastObservable.notify({
        type: "ADD_TOAST",
        toast: {
            id: Math.random(),
            message: message,
            variant: "success",
        },
    });
};

toast.error = (message: string) => {
    toastObservable.notify({
        type: "ADD_TOAST",
        toast: {
            id: Math.random(),
            message: message,
            variant: "error",
        },
    });
};

toast.dismissAll = () => {
    toastObservable.notify({ type: "DISMISS_ALL" });
};
