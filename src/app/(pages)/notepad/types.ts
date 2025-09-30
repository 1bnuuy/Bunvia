import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor, RenderLeafProps } from "slate-react";

export type EditorTypes = BaseEditor & ReactEditor & HistoryEditor;

export type TextTypes = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  highlight?: string;
};

export type ParagraphTypes = {
  type: "paragraph";
  children: TextTypes[];
};

export type LeafTypes = RenderLeafProps & {
  leaf: TextTypes;
};

export type MarkTypes = "bold" | "italic" | "underline" | "highlight";

declare module "slate" {
  interface CustomTypes {
    Editor: EditorTypes;
    Paragraph: ParagraphTypes;
    Text: TextTypes;
  }
}
