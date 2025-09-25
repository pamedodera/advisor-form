import { type ReactElement, type ReactNode } from 'react';
import { type IconProps } from './Icon';

/**
 * Button type variants
 */
export type ButtonType = 'default' | 'ghost' | 'bare';

/**
 * Button appearance variants
 */
export type ButtonAppearance = 'primary' | 'secondary' | 'reverse' | 'inverted';

/**
 * Button intent variants
 */
export type ButtonIntent = 'none' | 'success' | 'destructive';

/**
 * Button size variants
 */
export type ButtonSize = 'large' | 'medium' | 'small';

/**
 * Button state variants
 */
export type ButtonState = 'normal' | 'hover' | 'active' | 'focus' | 'selected' | 'disabled' | 'loading';

/**
 * Comprehensive Button component props interface
 */
export interface ButtonProps {
  /**
   * The button label text
   */
  label?: string;

  /**
   * React children to render inside the button (alternative to label)
   */
  children?: ReactNode;
  
  /**
   * Icon to display before the button text
   * Must be an Icon component instance
   */
  beforeIcon?: ReactElement<IconProps> | null;
  
  /**
   * Icon to display after the button text
   * Must be an Icon component instance
   */
  afterIcon?: ReactElement<IconProps> | null;
  
  /**
   * Button type variant
   * @default "default"
   */
  type?: ButtonType;
  
  /**
   * Button appearance variant
   * @default "primary"
   */
  appearance?: ButtonAppearance;
  
  /**
   * Button intent variant
   * @default "none"
   */
  intent?: ButtonIntent;
  
  /**
   * Button size variant
   * @default "medium"
   */
  size?: ButtonSize;
  
  /**
   * Button state variant
   * @default "normal"
   */
  state?: ButtonState;
  
  /**
   * Whether to show dropdown indicator
   * @default false
   */
  hasDropdownIndicator?: boolean;
  
  /**
   * Counter value to display in a badge next to the button label
   * Useful for showing counts like undefined terms, notifications, etc.
   */
  counterValue?: number;
  
  /**
   * Click event handler
   */
  onClick?: () => void;
  
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Button HTML type
   * @default "button"
   */
  htmlType?: 'button' | 'submit' | 'reset';
  
  /**
   * Accessible label for the button. If not provided, will use label text.
   * Required for icon-only buttons or when label doesn't describe the action clearly.
   */
  'aria-label'?: string;
  
  /**
   * ID of element that describes this button
   */
  'aria-describedby'?: string;
  
  /**
   * Whether the button controls a popup menu or dialog
   */
  'aria-haspopup'?: boolean | 'menu' | 'dialog' | 'listbox' | 'tree' | 'grid';
  
  /**
   * Whether the controlled element is expanded (for dropdown buttons)
   */
  'aria-expanded'?: boolean;
}

/**
 * Get size-specific styles for the button
 */
const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'large':
      return {
        height: 'h-12', // 48px
        padding: 'px-4',
        fontSize: 'text-base', // 16px
        lineHeight: 'leading-7', // 28px
        gap: 'gap-2'
      };
    case 'small':
      return {
        height: 'h-8', // 32px
        padding: 'px-3',
        fontSize: 'text-sm', // 14px
        lineHeight: 'leading-6', // 24px
        gap: 'gap-1.5'
      };
    case 'medium':
    default:
      return {
        height: 'h-10', // 40px
        padding: 'px-4',
        fontSize: 'text-sm', // 14px
        lineHeight: 'leading-6', // 24px
        gap: 'gap-2'
      };
  }
};

/**
 * Generate complete button classes based on type, appearance, and intent
 */
const getButtonClasses = (type: ButtonType, appearance: ButtonAppearance, intent: ButtonIntent) => {
  const baseClasses = "inline-flex items-center justify-center font-medium cursor-pointer transition-colors duration-150";
  
  let bgClasses = "";
  let textClasses = "";
  let hoverClasses = "";
  let shadowClasses = "";
  
  // TYPE RULES
  if (type === 'default') {
    // Default gets background + shadow + border radius
    shadowClasses = "shadow-sm rounded";
    
    // INTENT WORKS WITHIN APPEARANCE CONTEXT
    if (appearance === 'primary') {
      if (intent === 'success') {
        bgClasses = "bg-green-0";
        textClasses = "text-white";
        hoverClasses = "hover:bg-green-1";
      } else if (intent === 'destructive') {
        bgClasses = "bg-red-0";
        textClasses = "text-white";
        hoverClasses = "hover:bg-red-1";
      } else {
        // No intent - default primary
        bgClasses = "bg-dark-blue-0";
        textClasses = "text-white";
        hoverClasses = "hover:bg-night-sky-blue-dark-1";
      }
    } else if (appearance === 'secondary') {
      if (intent === 'success') {
        bgClasses = "bg-white border border-green-3";
        textClasses = "text-green-dark-4";
        hoverClasses = "hover:border-green-2";
      } else if (intent === 'destructive') {
        bgClasses = "bg-white border border-red-3";
        textClasses = "text-red-dark-4";
        hoverClasses = "hover:border-red-2";
      } else {
        // No intent - default secondary
        bgClasses = "bg-white border border-night-sky-blue-3";
        textClasses = "text-night-sky-blue-dark-4";
        hoverClasses = "hover:bg-dark-blue-5 hover:border-night-sky-blue-2";
      }
    }
  } else if (type === 'ghost') {
    // Ghost: NO bg/border classes EVER
    if (intent === 'success') {
      textClasses = "text-green-0";
      hoverClasses = "hover:bg-green-8";
    } else if (intent === 'destructive') {
      textClasses = "text-red-0";
      hoverClasses = "hover:bg-red-8";
    } else {
      if (appearance === 'primary') {
        textClasses = "text-dark-blue-0";
        hoverClasses = "hover:bg-dark-blue-8";
      } else if (appearance === 'secondary') {
        textClasses = "text-night-sky-blue-0";
        hoverClasses = "hover:bg-night-sky-blue-8";
      }
    }
  } else if (type === 'bare') {
    // Bare: NO bg/border/padding classes EVER
    if (intent === 'success') {
      textClasses = "text-green-0";
      hoverClasses = "hover:text-green-1";
    } else if (intent === 'destructive') {
      textClasses = "text-red-0";
      hoverClasses = "hover:text-red-1";
    } else {
      if (appearance === 'primary') {
        textClasses = "text-dark-blue-0";
        hoverClasses = "hover:text-dark-blue-1";
      } else if (appearance === 'secondary') {
        textClasses = "text-night-sky-blue-0";
        hoverClasses = "hover:text-night-sky-blue-1";
      }
    }
  }
  
  return `${baseClasses} ${bgClasses} ${textClasses} ${hoverClasses} ${shadowClasses}`.replace(/\s+/g, ' ').trim();
};

/**
 * Get padding adjustments based on icon presence
 */
const getPaddingAdjustments = (
  size: ButtonSize,
  hasBeforeIcon: boolean,
  hasAfterIcon: boolean,
  hasDropdownIndicator: boolean,
  type: ButtonType
) => {
  // Bare buttons have no padding
  if (type === 'bare') {
    return '';
  }
  
  const baseSize = getSizeStyles(size);
  
  if (size === 'small') {
    if (hasBeforeIcon && hasAfterIcon) return 'px-2';
    if (hasBeforeIcon && hasDropdownIndicator) return 'px-2';
    if (hasBeforeIcon) return 'px-2';
    if (hasAfterIcon) return 'px-2';
    if (hasDropdownIndicator) return 'p-2';
    return baseSize.padding;
  }
  
  if (size === 'medium') {
    if (hasBeforeIcon && hasAfterIcon) return 'px-3';
    if (hasBeforeIcon && hasDropdownIndicator) return 'px-3';
    if (hasBeforeIcon) return 'px-3';
    if (hasAfterIcon) return 'px-3';
    if (hasDropdownIndicator) return 'px-3';
    return baseSize.padding;
  }
  
  if (size === 'large') {
    if (hasBeforeIcon && hasAfterIcon) return 'px-3';
    if (hasBeforeIcon && hasDropdownIndicator) return 'px-3';
    if (hasBeforeIcon) return 'px-4';
    if (hasAfterIcon) return 'px-4';
    if (hasDropdownIndicator) return 'px-4';
    return baseSize.padding;
  }
  
  return baseSize.padding;
};

/**
 * Button component following  Design System
 * 
 * @param props - Button component props
 * @returns JSX.Element
 */
export function Button({
  label,
  children,
  beforeIcon = null,
  afterIcon = null,
  type = "default",
  appearance = "primary",
  intent = "none",
  size = "medium",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  state: _state = "normal", // TODO: Implement other states (hover, active, etc.)
  hasDropdownIndicator = false,
  counterValue,
  onClick,
  disabled = false,
  className = "",
  htmlType = "button",
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-haspopup': ariaHasPopup,
  'aria-expanded': ariaExpanded
}: ButtonProps) {
  // Note: _state is received but not yet used in implementation
  // It is kept for future functionality and API consistency
  const sizeStyles = getSizeStyles(size);
  
  const hasBeforeIcon = Boolean(beforeIcon);
  const hasAfterIcon = Boolean(afterIcon);
  
  const padding = getPaddingAdjustments(size, hasBeforeIcon, hasAfterIcon, hasDropdownIndicator, type);
  
  // Generate the complete button classes
  const buttonClasses = getButtonClasses(type, appearance, intent);
  
  // Content to display - prioritize children over label
  const displayContent = children || label;

  // Determine if this is an icon-only button
  const isIconOnly = !displayContent && (hasBeforeIcon || hasAfterIcon);

  // Generate accessible label
  const accessibleLabel = ariaLabel || (isIconOnly ? `${type} button` : (typeof displayContent === 'string' ? displayContent : undefined));
  
  const baseClasses = [
    buttonClasses,
    // Sizing
    sizeStyles.height,
    padding,
    // Typography
    sizeStyles.fontSize,
    sizeStyles.lineHeight,
    // Gap for internal elements
    sizeStyles.gap,
    // Disabled state
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    // Focus styles - use proper Tailwind classes
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-blue-0 focus-visible:ring-offset-2'
  ].filter(Boolean).join(' ');
  
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };
  
  return (
    <button
      type={htmlType}
      className={`${baseClasses} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      aria-label={isIconOnly ? accessibleLabel : ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-haspopup={hasDropdownIndicator ? (ariaHasPopup || 'menu') : ariaHasPopup}
      aria-expanded={hasDropdownIndicator ? ariaExpanded : undefined}
      data-testid="button"
    >
      {/* Before Icon */}
      {hasBeforeIcon && (
        <span className="flex items-center justify-center w-5 h-5 flex-shrink-0">
          {(() => {
            if (typeof beforeIcon === 'string') {
              throw new Error('beforeIcon must be an Icon component instance, not a string. Use <Icon type="..." /> instead.');
            }
            return beforeIcon;
          })()}
        </span>
      )}
      
      {/* Button Text/Content */}
      {displayContent && (
        <span className="flex-shrink-0 whitespace-nowrap">
          {displayContent}
        </span>
      )}
      
      {/* Counter Badge */}
      {counterValue !== undefined && counterValue > 0 && (
        <span className="flex-shrink-0 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium text-white bg-red-0 rounded-full">
          {counterValue > 99 ? '99+' : counterValue}
        </span>
      )}
      
      
      
      {/* After Icon */}
      {hasAfterIcon && (
        <span className="flex items-center justify-center w-5 h-5 flex-shrink-0">
          {(() => {
            if (typeof afterIcon === 'string') {
              throw new Error('afterIcon must be an Icon component instance, not a string. Use <Icon type="..." /> instead.');
            }
            return afterIcon;
          })()}
        </span>
      )}
      
      {/* Dropdown Indicator */}
      {hasDropdownIndicator && (
        <span className="flex items-center justify-center w-5 h-5 flex-shrink-0">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path 
              d="M6 8L10 12L14 8" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </button>
  );
}

export default Button;

