import { Variants } from "motion";

//--------------Auth--------------//
export type AuthTypes = {
  email: string;
  password: string;
  onChange: (user: import("firebase/auth").User | null) => void;
};

//--------------Theme--------------//
export type ThemeContextTypes = {
  ThemeDark: boolean;
  ThemeToggle: () => void;
};

//--------------Toast--------------//
export type ToastContextTypes = {
  toastPopUp: (content: ToastContentTypes) => void;
};

export type ToastComponentTypes = (id: number) => React.ReactNode;

export type ToastTypes = {
  id: number;
  component: React.ReactNode;
};

export type ToastContentTypes = {
  success: boolean;
  msg: string;
};

//--------------UI--------------//
export type UIContextTypes = {
  navOpen: boolean;
  navToggle: () => void;
};

//--------------Home--------------//
export type AddOnTypes = {
  size?: number;
  h?: number;
  w?: number;
  t?: number;
  l?: number;
  abs?: boolean;
  attribute?: boolean;
};

export type SVGTypes = "wordbook" | "progress" | "notebook" | "world";

export type ArticleTypes = {
  gridType: string;
  variants: Variants;
  title: string;
  description: string;
  svg?: SVGTypes;
};

//--------------API--------------//
export type ApiResponseTypes = {
  success: boolean;
  msg: string;
};
