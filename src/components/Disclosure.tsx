import React, { type ReactElement } from 'react';
import { Disclosure as HeadlessDisclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { type IconProps } from './Icon';

/**
 * Disclosure size variants
 */
export type DisclosureSize = 'small' | 'medium' | 'large';

/**
 * Disclosure intent variants
 */
export type DisclosureIntent = 'neutral' | 'informative' | 'positive' | 'warning' | 'negative';

/**
 * Disclosure visual variants
 */
export type DisclosureVariant = 'default' | 'ghost' | 'bare';

/**
 * Comprehensive Disclosure component props interface
 */
export interface DisclosureProps {
  /**
   * The trigger button text
   * @default "Disclosure trigger"
   */
  trigger?: string;
  
  /**
   * The content to show/hide
   */
  children: React.ReactNode;
  
  /**
   * Size variant
   * @default "medium"
   */
  size?: DisclosureSize;
  
  /**
   * Intent variant
   * @default "neutral"
   */
  intent?: DisclosureIntent;
  
  /**
   * Visual variant
   * @default "default"
   */
  variant?: DisclosureVariant;
  
  /**
   * Position within a group for proper border radius handling
   * @default "standalone"
   */
  groupPosition?: 'standalone' | 'first' | 'middle' | 'last';
  
  /**
   * Icon to display before the trigger text
   */
  beforeIcon?: ReactElement<IconProps> | null;
  
  /**
   * Icon to display after the trigger text (replaces default chevron)
   */
  afterIcon?: ReactElement<IconProps> | null;
  
  /**
   * Whether to show the default chevron icon
   * @default true
   */
  showChevron?: boolean;
  
  /**
   * Whether the disclosure is initially open
   * @default false
   */
  defaultOpen?: boolean;
  
  /**
   * Whether the disclosure is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  
  /**
   * Additional CSS classes for the trigger button
   */
  triggerClassName?: string;
  
  /**
   * Additional CSS classes for the content panel
   */
  panelClassName?: string;
  
  /**
   * Callback fired when the disclosure state changes
   */
  onChange?: (open: boolean) => void;
  
  /**
   * Accessible label for the trigger button
   */
  'aria-label'?: string;
  
  /**
   * ID of element that describes the disclosure
   */
  'aria-describedby'?: string;
}

/**
 * Get size-specific styles for the disclosure
 */
const getSizeStyles = (size: DisclosureSize) => {
  switch (size) {
    case 'small':
      return {
        trigger: {
          padding: 'px-3 py-2',
          fontSize: 'text-sm',
          lineHeight: 'leading-5',
          gap: 'gap-1.5'
        },
        panel: {
          padding: 'px-3 py-2',
          fontSize: 'text-sm',
          lineHeight: 'leading-5'
        }
      };
    case 'large':
      return {
        trigger: {
          padding: 'px-4 py-3',
          fontSize: 'text-base',
          lineHeight: 'leading-6',
          gap: 'gap-2'
        },
        panel: {
          padding: 'px-4 py-3',
          fontSize: 'text-base',
          lineHeight: 'leading-6'
        }
      };
    case 'medium':
    default:
      return {
        trigger: {
          padding: 'px-3 py-2.5',
          fontSize: 'text-sm',
          lineHeight: 'leading-5',
          gap: 'gap-2'
        },
        panel: {
          padding: 'px-3 py-2.5',
          fontSize: 'text-sm',
          lineHeight: 'leading-5'
        }
      };
  }
};

/**
 * Get intent-specific styles for the disclosure
 */
const getIntentStyles = (intent: DisclosureIntent, variant: DisclosureVariant) => {
  const baseStyles = {
    trigger: {
      bg: '',
      text: '',
      hover: '',
      border: ''
    },
    panel: {
      bg: '',
      text: '',
      border: ''
    }
  };

  switch (intent) {
    case 'informative':
      if (variant === 'default') {
        baseStyles.trigger = {
          bg: 'bg-blue-7',
          text: 'text-blue-0',
          hover: 'hover:bg-blue-6',
          border: 'border-blue-4'
        };
        baseStyles.panel = {
          bg: 'bg-blue-8',
          text: 'text-blue-0',
          border: 'border-blue-4'
        };
      } else if (variant === 'ghost') {
        baseStyles.trigger = {
          bg: '',
          text: 'text-blue-0',
          hover: 'hover:bg-blue-8',
          border: ''
        };
        baseStyles.panel = {
          bg: '',
          text: 'text-blue-0',
          border: ''
        };
      } else { // bare
        baseStyles.trigger = {
          bg: '',
          text: 'text-blue-0',
          hover: 'hover:text-blue-1',
          border: ''
        };
        baseStyles.panel = {
          bg: '',
          text: 'text-blue-0',
          border: ''
        };
      }
      break;
    case 'positive':
      if (variant === 'default') {
        baseStyles.trigger = {
          bg: 'bg-green-7',
          text: 'text-green-0',
          hover: 'hover:bg-green-6',
          border: 'border-green-4'
        };
        baseStyles.panel = {
          bg: 'bg-green-8',
          text: 'text-green-0',
          border: 'border-green-4'
        };
      } else if (variant === 'ghost') {
        baseStyles.trigger = {
          bg: '',
          text: 'text-green-0',
          hover: 'hover:bg-green-8',
          border: ''
        };
        baseStyles.panel = {
          bg: '',
          text: 'text-green-0',
          border: ''
        };
      } else { // bare
        baseStyles.trigger = {
          bg: '',
          text: 'text-green-0',
          hover: 'hover:text-green-1',
          border: ''
        };
        baseStyles.panel = {
          bg: '',
          text: 'text-green-0',
          border: ''
        };
      }
      break;
    case 'warning':
      if (variant === 'default') {
        baseStyles.trigger = {
          bg: 'bg-yellow-7',
          text: 'text-yellow-0',
          hover: 'hover:bg-yellow-6',
          border: 'border-yellow-4'
        };
        baseStyles.panel = {
          bg: 'bg-yellow-8',
          text: 'text-yellow-0',
          border: 'border-yellow-4'
        };
      } else if (variant === 'ghost') {
        baseStyles.trigger = {
          bg: '',
          text: 'text-yellow-0',
          hover: 'hover:bg-yellow-8',
          border: ''
        };
        baseStyles.panel = {
          bg: '',
          text: 'text-yellow-0',
          border: ''
        };
      } else { // bare
        baseStyles.trigger = {
          bg: '',
          text: 'text-yellow-0',
          hover: 'hover:text-yellow-1',
          border: ''
        };
        baseStyles.panel = {
          bg: '',
          text: 'text-yellow-0',
          border: ''
        };
      }
      break;
    case 'negative':
      if (variant === 'default') {
        baseStyles.trigger = {
          bg: 'bg-red-7',
          text: 'text-red-0',
          hover: 'hover:bg-red-6',
          border: 'border-red-4'
        };
        baseStyles.panel = {
          bg: 'bg-red-8',
          text: 'text-red-0',
          border: 'border-red-4'
        };
      } else if (variant === 'ghost') {
        baseStyles.trigger = {
          bg: '',
          text: 'text-red-0',
          hover: 'hover:bg-red-8',
          border: ''
        };
        baseStyles.panel = {
          bg: '',
          text: 'text-red-0',
          border: ''
        };
      } else { // bare
        baseStyles.trigger = {
          bg: '',
          text: 'text-red-0',
          hover: 'hover:text-red-1',
          border: ''
        };
        baseStyles.panel = {
          bg: '',
          text: 'text-red-0',
          border: ''
        };
      }
      break;
    case 'neutral':
    default:
      if (variant === 'default') {
        baseStyles.trigger = {
          bg: 'bg-night-sky-blue-7',
          text: 'text-night-sky-blue-0',
          hover: 'hover:bg-night-sky-blue-6',
          border: 'border-night-sky-blue-4'
        };
        baseStyles.panel = {
          bg: 'bg-night-sky-blue-8',
          text: 'text-night-sky-blue-0',
          border: 'border-night-sky-blue-4'
        };
      } else if (variant === 'ghost') {
        baseStyles.trigger = {
          bg: '',
          text: 'text-night-sky-blue-0',
          hover: 'hover:bg-night-sky-blue-8',
          border: ''
        };
        baseStyles.panel = {
          bg: '',
          text: 'text-night-sky-blue-0',
          border: ''
        };
      } else { // bare
        baseStyles.trigger = {
          bg: '',
          text: 'text-night-sky-blue-0',
          hover: 'hover:text-night-sky-blue-1',
          border: ''
        };
        baseStyles.panel = {
          bg: '',
          text: 'text-night-sky-blue-0',
          border: ''
        };
      }
      break;
  }

  return baseStyles;
};

/**
 * Get variant-specific base styles
 */
const getVariantStyles = (variant: DisclosureVariant, groupPosition: 'standalone' | 'first' | 'middle' | 'last' = 'standalone') => {
  const getBorderRadius = () => {
    if (variant !== 'default') return '';
    
    switch (groupPosition) {
      case 'first':
        return 'rounded-t-lg';
      case 'middle':
        return 'rounded-none';
      case 'last':
        return 'rounded-b-md';
      case 'standalone':
      default:
        return 'rounded-md';
    }
  };

  const getBorderStyle = () => {
    if (variant !== 'default') return '';
    
    switch (groupPosition) {
      case 'first':
        return 'border';
      case 'middle':
        return 'border-x border-b';
      case 'last':
        return 'border-x border-b';
      case 'standalone':
      default:
        return 'border';
    }
  };

  switch (variant) {
    case 'default':
      return {
        container: `${getBorderStyle()} ${getBorderRadius()} shadow-sm`,
        trigger: 'w-full text-left transition-colors duration-150',
        panel: 'border-t'
      };
    case 'ghost':
      return {
        container: '',
        trigger: `w-full text-left transition-colors duration-150 ${getBorderRadius()}`,
        panel: ''
      };
    case 'bare':
      return {
        container: '',
        trigger: 'w-full text-left transition-colors duration-150',
        panel: ''
      };
    default:
      return {
        container: `${getBorderStyle()} ${getBorderRadius()} shadow-sm`,
        trigger: 'w-full text-left transition-colors duration-150',
        panel: 'border-t'
      };
  }
};

/**
 * Disclosure component following Design System
 * 
 * @param props - Disclosure component props
 * @returns JSX.Element
 */
export function Disclosure({
  trigger = "Disclosure trigger",
  children,
  size = "medium",
  intent = "neutral",
  variant = "default",
  groupPosition = "standalone",
  beforeIcon = null,
  afterIcon = null,
  showChevron = true,
  defaultOpen = false,
  disabled = false,
  className = "",
  triggerClassName = "",
  panelClassName = "",
  onChange,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy
}: DisclosureProps) {
  const sizeStyles = getSizeStyles(size);
  const intentStyles = getIntentStyles(intent, variant);
  const variantStyles = getVariantStyles(variant, groupPosition);

  const hasBeforeIcon = Boolean(beforeIcon);
  const hasAfterIcon = Boolean(afterIcon);
  const hasChevron = showChevron && !hasAfterIcon;

  const containerClasses = [
    variantStyles.container,
    intentStyles.trigger.border,
    'overflow-hidden',
    className
  ].filter(Boolean).join(' ');

  const triggerClasses = [
    variantStyles.trigger,
    sizeStyles.trigger.padding,
    sizeStyles.trigger.fontSize,
    sizeStyles.trigger.lineHeight,
    sizeStyles.trigger.gap,
    intentStyles.trigger.bg,
    intentStyles.trigger.text,
    intentStyles.trigger.hover,
    'flex items-center justify-between',
    'font-medium',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-blue-0 focus-visible:ring-offset-2',
    triggerClassName
  ].filter(Boolean).join(' ');

  const panelClasses = [
    variantStyles.panel,
    sizeStyles.panel.padding,
    sizeStyles.panel.fontSize,
    sizeStyles.panel.lineHeight,
    intentStyles.panel.bg,
    intentStyles.panel.text,
    intentStyles.panel.border,
    panelClassName
  ].filter(Boolean).join(' ');

  return (
    <HeadlessDisclosure
      as="div"
      className={containerClasses}
      defaultOpen={defaultOpen}
    >
      {({ open }) => (
        <>
          <DisclosureButton
            className={triggerClasses}
            disabled={disabled}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            data-testid="disclosure-trigger"
            onClick={() => onChange?.(!open)}
          >
            <div className="flex items-center gap-2 flex-1">
              {/* Before Icon */}
              {hasBeforeIcon && (
                <span className="flex items-center justify-center w-5 h-5 flex-shrink-0">
                  {beforeIcon}
                </span>
              )}
              
              {/* Trigger Text */}
              <span className="flex-1 text-left">
                {trigger}
              </span>
            </div>
            
            {/* After Icon or Chevron */}
            <span className="flex items-center justify-center w-5 h-5 flex-shrink-0">
              {hasAfterIcon ? (
                afterIcon
              ) : hasChevron ? (
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    open ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              ) : null}
            </span>
          </DisclosureButton>

          <DisclosurePanel
            className={panelClasses}
            data-testid="disclosure-panel"
          >
            {children}
          </DisclosurePanel>
        </>
      )}
    </HeadlessDisclosure>
  );
}

export default Disclosure;