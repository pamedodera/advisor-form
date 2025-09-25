export type IconType =
  | "file"
  | "minus-circle"
  | "format-bold"
  | "upload-file"
  | "export"
  | "search"
  | "format-italic"
  | "global-search"
  | "home"
  | "format-underline"
  | "arrow-external"
  | "compare"
  | "arrow-up"
  | "arrow-right"
  | "caret-left"
  | "caret-right"
  | "caret-down"
  | "caret-up"
  | "arrow-up-left"
  | "collapse-sidebar"
  | "question-mark"
  | "info"
  | "warning"
  | "error"
  | "plus-circle"
  | "expand-window"
  | "collapse-window"
  | "folder"
  | "stop"
  | "close"
  | "plus"
  | "settings"
  | "history"
  | "link"
  | "unlink"
  | "check"
  | "check-circle"
  | "bolt"
  | "refresh"
  | "clear"
  | "delete"
  | "edit"
  | "copy"
  | "thumbs-up"
  | "thumbs-down"
  | "print"
  | "personal"
  | "quotes"
  | "calendar"
  | "filters"
  | "bookmark"
  | "bookmark-filled"
  | "flag"
  | "flag-filled"
  | "show"
  | "hide"
  | "gold-standard"
  | "definitely-logo"
  | "file-pdf"
  | "file-word"
  | "file-excel"
  | "funnel-simple";

export type IconSize = "small" | "medium" | "large";

export interface IconProps {
  type: IconType;
  size?: IconSize;
  className?: string;
  /**
   * Alternative text for the icon. If not provided, icon will be hidden from screen readers (decorative).
   * Use meaningful descriptions for functional icons.
   */
  alt?: string;
  /**
   * Whether this icon is purely decorative and should be hidden from screen readers
   * @default true when alt is not provided
   */
  decorative?: boolean;
}