"use client";

import { createContext, useContext, useState } from "react";
import { UIContextTypes } from "../lib/globalTypes";

const UIContext = createContext<UIContextTypes | undefined>(undefined);
export const useUI = (): UIContextTypes => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used inside UIProvider");
  }
  return context;
};

export default function UIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(false);

  const navToggle = () => {
    setNavOpen(!navOpen);
  };

  return (
    <UIContext.Provider value={{ navOpen, navToggle }}>
      {children}
    </UIContext.Provider>
  );
}
