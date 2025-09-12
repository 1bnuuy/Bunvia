import { StarTypes } from "@/lib/types";

export const Star = ({ size, t, l }: StarTypes) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ top: `${t}%`, left: `${l}%` }}
      className="fill-heading dark:fill-heading-dark pointer-events-none absolute"
    >
      <path
        d="M12 3C12 7.97056 7.97056 12 3 12C7.97056 12 12 16.0294 12 21C12 16.0294 16.0294 12 21 12C16.0294 12 12 7.97056 12 3Z"
        className="stroke-heading dark:stroke-heading-dark"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Star2 = ({ size, t, l }: StarTypes) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ top: `${t}%`, left: `${l}%` }}
      className="fill-heading dark:fill-heading-dark pointer-events-none absolute"
    >
      <path
        d="M10 4C10 7.31371 7.31371 10 4 10C7.31371 10 10 12.6863 10 16C10 12.6863 12.6863 10 16 10C12.6863 10 10 7.31371 10 4Z"
        className="stroke-heading dark:stroke-heading-dark"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 15C17.5 16.3807 16.3807 17.5 15 17.5C16.3807 17.5 17.5 18.6193 17.5 20C17.5 18.6193 18.6193 17.5 20 17.5C18.6193 17.5 17.5 16.3807 17.5 15Z"
        className="stroke-heading dark:stroke-heading-dark"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
