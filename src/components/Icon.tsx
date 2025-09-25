import React from "react";
import type { IconProps, IconSize, IconType } from "../components/types/Icon";

import FileIcon from "../assets/icons/file.svg?react";
import MinusCircleIcon from "../assets/icons/minus-circle.svg?react";
import ExportIcon from "../assets/icons/export.svg?react";
import ArrowUpIcon from "../assets/icons/arrow-up.svg?react";
import ArrowRightIcon from "../assets/icons/arrow-right.svg?react";
import CaretLeftIcon from "../assets/icons/caret-left.svg?react";
import CaretRightIcon from "../assets/icons/caret-right.svg?react";
import CaretDownIcon from "../assets/icons/caret-down.svg?react";
import CaretUpIcon from "../assets/icons/caret-up.svg?react";
import ArrowUpLeftIcon from "../assets/icons/arrow-up-left.svg?react";
import QuestionMarkIcon from "../assets/icons/question-mark.svg?react";
import InfoIcon from "../assets/icons/info.svg?react";
import WarningIcon from "../assets/icons/warning.svg?react";
import PlusCircleIcon from "../assets/icons/plus-circle.svg?react";
import FolderIcon from "../assets/icons/folder.svg?react";
import StopIcon from "../assets/icons/stop.svg?react";
import PlusIcon from "../assets/icons/plus.svg?react";
import LinkIcon from "../assets/icons/link.svg?react";
import CheckIcon from "../assets/icons/check.svg?react";
import CheckCircleIcon from "../assets/icons/check-circle.svg?react";
import CopyIcon from "../assets/icons/copy.svg?react";
import ThumbsUpIcon from "../assets/icons/thumbs-up.svg?react";
import ThumbsDownIcon from "../assets/icons/thumbs-down.svg?react";
import CalendarIcon from "../assets/icons/calendar.svg?react";
import BookmarkIcon from "../assets/icons/bookmark.svg?react";
import FlagIcon from "../assets/icons/flag.svg?react";
import QuotesIcon from "../assets/icons/quotes.svg?react";
import FilePdfIcon from "../assets/icons/file-pdf.svg?react";
import TextBIcon from "../assets/icons/text-b.svg?react";
import TextItalicIcon from "../assets/icons/text-italic.svg?react";
import TextUnderlineIcon from "../assets/icons/text-underline.svg?react";
import FileArrowUpIcon from "../assets/icons/file-arrow-up.svg?react";
import MagnifyingGlassIcon from "../assets/icons/magnifying-glass.svg?react";
import GlobeIcon from "../assets/icons/globe.svg?react";
import HouseIcon from "../assets/icons/house.svg?react";
import ArrowSquareOutIcon from "../assets/icons/arrow-square-out.svg?react";
import ArrowsLeftRightIcon from "../assets/icons/arrows-left-right.svg?react";
import CaretDoubleLeftIcon from "../assets/icons/caret-double-left.svg?react";
import WarningDiamondIcon from "../assets/icons/warning-diamond.svg?react";
import CornersOutIcon from "../assets/icons/corners-out.svg?react";
import CornersInIcon from "../assets/icons/corners-in.svg?react";
import XIcon from "../assets/icons/x.svg?react";
import GearSixIcon from "../assets/icons/gear-six.svg?react";
import ClockCounterClockwiseIcon from "../assets/icons/clock-counter-clockwise.svg?react";
import LinkBreakIcon from "../assets/icons/link-break.svg?react";
import LightningIcon from "../assets/icons/lightning.svg?react";
import ArrowClockwiseIcon from "../assets/icons/arrow-clockwise.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import PencilIcon from "../assets/icons/pencil.svg?react";
import PrinterIcon from "../assets/icons/printer.svg?react";
import UserIcon from "../assets/icons/user.svg?react";
import FunnelIcon from "../assets/icons/funnel.svg?react";
import EyeIcon from "../assets/icons/eye.svg?react";
import EyeSlashIcon from "../assets/icons/eye-slash.svg?react";
import FileDocIcon from "../assets/icons/file-doc.svg?react";
import MicrosoftExcelLogoIcon from "../assets/icons/microsoft-excel-logo.svg?react";
import BookmarkFillIcon from "../assets/icons/bookmark-fill.svg?react";
import FlagFillIcon from "../assets/icons/flag-fill.svg?react";
import FunnelSimpleIcon from "../assets/icons/funnel-simple.svg?react";

// Helper function to render SVG components with proper props
const renderSvgIcon = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SvgComponent: any,
  className: string,
  style: React.CSSProperties,
  ariaLabel: string,
  ariaHidden: boolean
) => {
  return React.createElement(SvgComponent, {
    className,
    style,
    "aria-label": ariaLabel,
    "aria-hidden": ariaHidden,
    shapeRendering:"geometricPrecision",
    textRendering:"geometricPrecision"
  });
};

const getSizeValue = (
  size: IconSize
): { width: number; height: number; className: string } => {
  switch (size) {
    case "small":
      return { width: 16, height: 16, className: "w-4 h-4" };
    case "medium":
      return { width: 20, height: 20, className: "w-5 h-5" };
    case "large":
      return { width: 32, height: 32, className: "w-8 h-8" };
    default:
      return { width: 20, height: 20, className: "w-5 h-5" };
  }
};

const Icon: React.FC<IconProps> = ({
  type,
  size = "medium",
  className = "",
  alt,
  decorative,
}) => {
  const sizeProps = getSizeValue(size);
  const baseClasses = `${sizeProps.className} ${className}`;

  // Determine if icon should be hidden from screen readers
  const isDecorative = decorative !== undefined ? decorative : !alt;

  // Generate meaningful alt text or empty for decorative icons
  const altText = isDecorative ? "" : alt || type;

  const renderIcon = () => {
    switch (type) {
      case "file":
        return renderSvgIcon(
          FileIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "minus-circle":
        return renderSvgIcon(
          MinusCircleIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "format-bold":
        return renderSvgIcon(
          TextBIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "upload-file":
        return renderSvgIcon(
          FileArrowUpIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "search":
        return renderSvgIcon(
          MagnifyingGlassIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "home":
        return renderSvgIcon(
          HouseIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "export":
        return renderSvgIcon(
          ExportIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "format-italic":
        return renderSvgIcon(
          TextItalicIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "global-search":
        return renderSvgIcon(
          GlobeIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "format-underline":
        return renderSvgIcon(
          TextUnderlineIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "arrow-external":
        return renderSvgIcon(
          ArrowSquareOutIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "arrow-up":
        return renderSvgIcon(
          ArrowUpIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "arrow-right":
        return renderSvgIcon(
          ArrowRightIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "close":
        return renderSvgIcon(
          XIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "caret-left":
        return renderSvgIcon(
          CaretLeftIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "caret-right":
        return renderSvgIcon(
          CaretRightIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "caret-down":
        return renderSvgIcon(
          CaretDownIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "caret-up":
        return renderSvgIcon(
          CaretUpIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "compare":
        return renderSvgIcon(
          ArrowsLeftRightIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "arrow-up-left":
        return renderSvgIcon(
          ArrowUpLeftIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "collapse-sidebar":
        return renderSvgIcon(
          CaretDoubleLeftIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "question-mark":
        return renderSvgIcon(
          QuestionMarkIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "info":
        return renderSvgIcon(
          InfoIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "warning":
        return renderSvgIcon(
          WarningIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "error":
        return renderSvgIcon(
          WarningDiamondIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "plus-circle":
        return renderSvgIcon(
          PlusCircleIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "expand-window":
        return renderSvgIcon(
          CornersOutIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "collapse-window":
        return renderSvgIcon(
          CornersInIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "folder":
        return renderSvgIcon(
          FolderIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "stop":
        return renderSvgIcon(
          StopIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "plus":
        return renderSvgIcon(
          PlusIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "settings":
        return renderSvgIcon(
          GearSixIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "history":
        return renderSvgIcon(
          ClockCounterClockwiseIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "link":
        return renderSvgIcon(
          LinkIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "unlink":
        return renderSvgIcon(
          LinkBreakIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "check":
        return renderSvgIcon(
          CheckIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "check-circle":
        return renderSvgIcon(
          CheckCircleIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "bolt":
        return renderSvgIcon(
          LightningIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "refresh":
        return renderSvgIcon(
          ArrowClockwiseIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "clear":
        return renderSvgIcon(
          XIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "delete":
        return renderSvgIcon(
          TrashIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "edit":
        return renderSvgIcon(
          PencilIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "copy":
        return renderSvgIcon(
          CopyIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "thumbs-up":
        return renderSvgIcon(
          ThumbsUpIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "thumbs-down":
        return renderSvgIcon(
          ThumbsDownIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "print":
        return renderSvgIcon(
          PrinterIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "personal":
        return renderSvgIcon(
          UserIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "quotes":
        return renderSvgIcon(
          QuotesIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "calendar":
        return renderSvgIcon(
          CalendarIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "filters":
        return renderSvgIcon(
          FunnelIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "bookmark":
        return renderSvgIcon(
          BookmarkIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "bookmark-filled":
        return renderSvgIcon(
          BookmarkFillIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "flag":
        return renderSvgIcon(
          FlagIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "flag-filled":
        return renderSvgIcon(
          FlagFillIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "show":
        return renderSvgIcon(
          EyeIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "hide":
        return renderSvgIcon(
          EyeSlashIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "gold-standard":
        return (
          <svg
            width={sizeProps.width}
            height={sizeProps.height}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={baseClasses}
          >
            <path d="M12 3C16.9711 3 21 7.02942 21 11.9997C21 16.9699 16.9711 21 12 21H3V3H12Z" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.4383 11.9997C20.4383 7.3408 16.6616 3.5625 12 3.5625H3.56174V20.4375H12C16.6615 20.4375 20.4383 16.6586 20.4383 11.9997ZM21 11.9997C21 7.02942 16.9711 3 12 3H3V21H12C16.9711 21 21 16.9699 21 11.9997Z"
              fillOpacity="0.08"
            />
            <path d="M15.0009 7.00067H7.001V17.001H15.0009V7.00067Z" />
            <path d="M11.0006 10.9998V7.00067L7.001 10.9998H11.0006Z" />
            <path d="M7.001 7.00067V10.9998L11.0006 7.00067H7.001Z" />
          </svg>
        );
      case "definitely-logo":
        return (
          <svg
            width={sizeProps.width}
            height={sizeProps.height}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={baseClasses}
          >
            <path d="M12 3C16.9705 3 21 7.0295 21 12C21 16.9705 16.9705 21 12 21H3V3H12Z" />
            <path d="M15.15 7.05001H7.05V16.95H15.15V7.05001Z" />
            <path d="M11.1 11.1V7.00052L7.00049 11.1H11.1Z" />
            <path d="M7.05 7.05001V11.1L11.1 7.05001H7.05Z" />
          </svg>
        );
      case "file-pdf":
        return renderSvgIcon(
          FilePdfIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "file-word":
        return renderSvgIcon(
          FileDocIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "file-excel":
        return renderSvgIcon(
          MicrosoftExcelLogoIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      case "funnel-simple":
        return renderSvgIcon(
          FunnelSimpleIcon,
          baseClasses,
          { width: sizeProps.width, height: sizeProps.height },
          altText,
          isDecorative
        );
      default:
        return (
          <div
            className={baseClasses}
            role={isDecorative ? "presentation" : "img"}
            aria-label={isDecorative ? undefined : alt || `${type} icon`}
          >
            <span className="text-red-500" aria-hidden="true">
              ?
            </span>
          </div>
        );
    }
  };

  const iconElement = renderIcon();

  // Add accessibility attributes to the SVG element
  if (React.isValidElement(iconElement) && iconElement.type === "svg") {
    return React.cloneElement(iconElement, {
      // @ts-expect-error for some reason its not recognizing the attribute role which is valid
      role: isDecorative ? "presentation" : "img",
      "aria-label": isDecorative ? undefined : altText,
      "aria-hidden": isDecorative ? "true" : undefined,
    });
  }

  return iconElement;
};

export default Icon;
export type { IconProps, IconSize, IconType };
