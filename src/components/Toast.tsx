"use client";

import { useState, createContext, useContext, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";

import {
  ToastContextTypes,
  ToastTypes,
  ToastContentTypes,
  ToastComponentTypes,
} from "../lib/types";
import { btnRelocate } from "./Theme";

const ToastContext = createContext<ToastContextTypes | undefined>(undefined);
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<ToastTypes[]>([]);

  const open: (component: ToastComponentTypes) => void = (component) => {
    const id = Date.now() + Math.random();
    setToasts((toast) => [...toast, { id, component: component(id) }]);

    setTimeout(() => close(id), 5000);
  };

  const close: (id: number) => void = (id) =>
    setToasts((toast) => toast.filter((toast) => toast.id !== id));

  const toastPopUp: ToastContextTypes["toastPopUp"] = useCallback(
    ({ success, msg }: ToastContentTypes) => {
      open((id) => (
        <motion.div
          variants={btnRelocate}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className={`bg-secondary relative border-2 ${success ? "border-success" : "border-error"} dark:bg-secondary-dark flex w-[90vw] max-w-[555px] justify-between gap-3 rounded-lg px-3 py-2`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`${success ? "bg-success" : "bg-error"} h-full min-w-1.5 rounded-full`}
            />
            <div className="flex flex-col">
              <span
                className={`${success ? "text-success" : "text-error"} text-lg font-bold`}
              >
                {success ? "Hooray!" : "Uh-oh!"}
              </span>
              <span className="text-subtext dark:text-subtext-dark text-sm">
                {msg}
              </span>
            </div>
          </div>

          <button
            className="absolute top-0 left-0 size-full cursor-pointer"
            onClick={() => close(id)}
          />
        </motion.div>
      ));
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toastPopUp }}>
      {children}
      <div className="absolute top-5 z-40 flex flex-col gap-3 px-5 max-lg:left-1/2 max-lg:-translate-x-1/2 lg:right-0">
        <AnimatePresence mode="popLayout">
          {toasts.map(({ id, component }) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 0.3,
                type: "spring",
                visualDuration: 0.2,
                bounce: 0.5,
              }}
              key={id}
            >
              {component}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
