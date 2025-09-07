"use client";

import { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";

import {
  ToastContextTypes,
  ToastTypes,
  ToastContentTypes,
  ToastComponentTypes,
} from "./types";
import { btnVariants } from "./Theme";

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

  const toastPopUp: ToastContextTypes["toastPopUp"] = ({
    mode,
    msg,
    closeMsg,
  }: ToastContentTypes) => {
    open((id) => (
      <div
        className={`bg-secondary border-2 ${mode ? "border-success" : "border-error"} dark:bg-secondary-dark flex w-[90vw] max-w-[555px] justify-between gap-3 rounded-lg px-3 py-2`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`${mode ? "bg-success" : "bg-error"} h-full min-w-1.5 rounded-full`}
          />
          <div className="flex flex-col">
            <span
              className={`${mode ? "text-success" : "text-error"} text-lg font-bold`}
            >
              {mode ? "Hooray!" : "Uh-oh!"}
            </span>
            <span className="text-subtext dark:text-subtext-dark text-sm">
              {msg}
            </span>
          </div>
        </div>

        <motion.button
          variants={btnVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="text-accent dark:text-accent-dark bg-tertiary dark:bg-tertiary-dark active:text-accent-hovered dark:active:text-accent-hovered-dark hover:text-accent-hovered dark:hover:text-accent-hovered-dark cursor-pointer self-center rounded-md px-2 py-1 font-bold text-nowrap"
          onClick={() => close(id)}
        >
          {closeMsg}
        </motion.button>
      </div>
    ));
  };

  return (
    <ToastContext.Provider value={{ toastPopUp }}>
      {children}
      <div className="absolute top-5 z-40 flex flex-col gap-3 px-5 max-lg:left-1/2 max-lg:-translate-x-1/2 lg:right-0">
        <AnimatePresence>
          {toasts.map(({ id, component }) => (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
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
