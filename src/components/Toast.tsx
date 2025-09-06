"use client";

import { useState, createContext, useContext } from "react";
import { useTheme } from "./Theme";
import { AnimatePresence, motion } from "motion/react";
import { ToastContextTypes, ToastTypes } from "./types";

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

  const open: ToastContextTypes["open"] = (component) => {
    const id = Date.now() + Math.random();
    setToasts((toast) => [...toast, { id, component: component(id) }]);

    setTimeout(() => close(id), 5000);
  };

  const close: ToastContextTypes["close"] = (id) =>
    setToasts((toast) => toast.filter((toast) => toast.id !== id));

  return (
    <ToastContext.Provider value={{ open, close }}>
      {children}
      <div
        className="absolute top-5 right-0 z-40 flex flex-col items-end gap-3 overflow-hidden px-5 max-sm:items-center"
      >
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
