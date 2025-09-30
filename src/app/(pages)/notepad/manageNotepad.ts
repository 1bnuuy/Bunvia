import { ToastContextTypes } from "@/lib/globalTypes";
import React, { RefObject } from "react";
import { EditorTypes, MarkTypes } from "./types";
import { Editor, Range, Transforms } from "slate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const BtnFunc = (
  toastPopUp: ToastContextTypes["toastPopUp"],
  id: string,
  editor: EditorTypes,
  PrintContent: RefObject<HTMLDivElement | null>,
) => {
  switch (id.toUpperCase()) {
    case "SAVE":
      Save(PrintContent, toastPopUp);
      break;

    case "UNDO":
      editor.undo();
      break;

    case "REDO":
      editor.redo();
      break;

    case "HIGHLIGHT":
      Decoration(editor, "highlight");
      break;

    case "BOLD":
      Decoration(editor, "bold");
      break;

    case "ITALIC":
      Decoration(editor, "italic");
      break;

    case "UNDERLINE":
      Decoration(editor, "underline");
      break;

    case "CUT":
      Cut(toastPopUp, editor);
      break;

    case "COPY":
      Copy(toastPopUp, editor);
      break;

    case "PASTE":
      Paste(toastPopUp, editor);
      break;
  }
};

export const KeyboardFunc = (
  e: React.KeyboardEvent,
  toastPopUp: ToastContextTypes["toastPopUp"],
  editor: EditorTypes,
) => {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key.toUpperCase()) {
      case "Z":
        e.preventDefault();
        editor.undo();
        break;

      case "Y":
        e.preventDefault();
        editor.redo();
        break;

      case "B":
        e.preventDefault();
        Decoration(editor, "bold");
        break;

      case "I":
        e.preventDefault();
        Decoration(editor, "italic");
        break;

      case "U":
        e.preventDefault();
        Decoration(editor, "underline");
        break;

      case "X":
        e.preventDefault();
        Cut(toastPopUp, editor);
        break;

      case "C":
        e.preventDefault();
        Copy(toastPopUp, editor);
        break;

      case "V":
        e.preventDefault();
        Paste(toastPopUp, editor);
        break;
    }
  }
};

const Save = async (
  PrintContent: RefObject<HTMLDivElement | null>,
  toastPopUp: ToastContextTypes["toastPopUp"],
) => {
  const element = PrintContent.current;

  if (!element) return;

  try {
    element.style.overflow = "visible";
    element.classList.add("text-[#0f0f0f]");

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#fff",
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });
    const data = canvas.toDataURL("image/jpeg", 0.9);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "A4",
    });

    const paddingX = 10;

    const PageWidth = pdf.internal.pageSize.getWidth();
    const PageHeight = pdf.internal.pageSize.getHeight();

    const ImgWidth = PageWidth - paddingX * 2;
    const ImgHeight = (canvas.height * PageWidth) / canvas.width - 0.5;

    let position = 0;
    let heightLeft = ImgHeight;

    //First page
    pdf.addImage(data, "JPEG", paddingX, position, ImgWidth, ImgHeight);

    heightLeft -= PageHeight;

    //Extra pages
    while (heightLeft > 0) {
      position = heightLeft - ImgHeight;
      pdf.addPage();
      pdf.addImage(data, "JPEG", paddingX, position, ImgWidth, ImgHeight);
      heightLeft -= PageHeight;
    }

    pdf.save("document.pdf");
  } catch {
    toastPopUp({
      success: false,
      msg: "Something went wrong while extracting your PDF file!",
    });
  } finally {
    element.style.overflow = "auto";
    element.className += "text-heading dark:text-heading-dark";
    element.classList.remove("text-[#0f0f0f]");
  }
};

const Decoration = (editor: EditorTypes, type: MarkTypes) => {
  const isActive = (editor: EditorTypes, type: MarkTypes) => {
    const marks = Editor.marks(editor);

    return marks ? marks[type] === true : false;
  };

  if (isActive(editor, type)) {
    Editor.removeMark(editor, type);
  } else {
    Editor.addMark(editor, type, true);
  }
};

const Copy = (
  toastPopUp: ToastContextTypes["toastPopUp"],
  editor: EditorTypes,
) => {
  if (editor.selection && !Range.isCollapsed(editor.selection)) {
    const text = Editor.string(editor, editor.selection);
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toastPopUp({
          success: true,
          msg: "Copied and ready to hop anywhere!",
        });
      })
      .catch(() => {
        toastPopUp({
          success: false,
          msg: "Pee dropped the clipboard!",
        });
      });
  }
};

const Cut = (
  toastPopUp: ToastContextTypes["toastPopUp"],
  editor: EditorTypes,
) => {
  if (editor.selection && !Range.isCollapsed(editor.selection)) {
    const text = Editor.string(editor, editor.selection);
    navigator.clipboard
      .writeText(text)
      .then(() => {
        Transforms.delete(editor);
        toastPopUp({
          success: true,
          msg: "Snipped and saved to clipboard!",
        });
      })
      .catch(() => {
        toastPopUp({
          success: false,
          msg: "Could not cut, scissors are broken!",
        });
      });
  }
};

const Paste = (
  toastPopUp: ToastContextTypes["toastPopUp"],
  editor: EditorTypes,
) => {
  navigator.clipboard
    .readText()
    .then((text) => {
      Transforms.insertText(editor, text);
      toastPopUp({
        success: true,
        msg: "Paste successful, Poo dropped it here!",
      });
    })
    .catch(() => {
      toastPopUp({
        success: false,
        msg: "Clipboard is empty, Poo made a mess!",
      });
    });
};
