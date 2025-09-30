import { LeafTypes } from "./types";

export const Leaf = ({ attributes, children, leaf }: LeafTypes) => {
  let className = "";

  if (leaf.bold) className += " font-bold";
  if (leaf.italic) className += " italic";
  if (leaf.underline)
    className +=
      " decoration-accent dark:decoration-accent-dark underline decoration-2 underline-offset-3";
  if (leaf.highlight) className += " text-accent dark:text-accent-dark";

  return (
    <span {...attributes} className={className.trim()}>
      {children}
    </span>
  );
};
