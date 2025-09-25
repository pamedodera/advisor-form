import { Switch as HeadlessSwitch } from '@headlessui/react';
import { type ReactNode } from 'react';

/**
 * Switch size variants
 */
export type SwitchSize = 'small' | 'medium' | 'large';

/**
 * Switch intent variants for different visual states
 */
export type SwitchIntent = 'neutral' | 'positive' | 'negative' | 'warning';

/**
 * Comprehensive Switch component props interface
 */
export interface SwitchProps {
  /**
   * Whether the switch is checked
   */
  checked?: boolean;
  
  /**
   * Default checked state for uncontrolled usage
   */
  defaultChecked?: boolean;
  
  /**
   * Callback fired when the checked state changes
   */
  onChange?: (checked: boolean) => void;
  
  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;
  
  /**
   * Label text for the switch
   */
  label?: string;
  
  /**
   * Helper text displayed below the switch
   */
  helperText?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Size variant of the switch
   * @default "medium"
   */
  size?: SwitchSize;
  
  /**
   * Intent variant affecting the color scheme
   * @default "neutral"
   */
  intent?: SwitchIntent;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Name attribute for form submission
   */
  name?: string;
  
  /**
   * ID for the switch element
   */
  id?: string;
  
  /**
   * Value attribute for form submission
   */
  value?: string;
  
  /**
   * Accessible label for the switch. If not provided, will use label text.
   */
  'aria-label'?: string;
  
  /**
   * ID of element that describes this switch
   */
  'aria-describedby'?: string;
  
  /**
   * Additional content to render alongside the switch
   */
  children?: ReactNode;
}

/**
 * Get size-specific styles for the switch
 */
const getSizeStyles = (size: SwitchSize) => {
  switch (size) {
    case 'small':
      return {
        track: 'h-5 w-9',
        thumb: 'size-3',
        thumbTranslate: 'translate-x-0.5 group-data-checked:translate-x-5',
        label: 'typography-label text-sm',
        helper: 'typography-body-text-sm',
        gap: 'gap-2'
      };
    case 'large':
      return {
        track: 'h-8 w-14',
        thumb: 'size-6',
        thumbTranslate: 'translate-x-1 group-data-checked:translate-x-7',
        label: 'typography-label-lg',
        helper: 'typography-body-text',
        gap: 'gap-3'
      };
    case 'medium':
    default:
      return {
        track: 'h-6 w-11',
        thumb: 'size-4',
        thumbTranslate: 'translate-x-1 group-data-checked:translate-x-6',
        label: 'typography-label',
        helper: 'typography-label-helper',
        gap: 'gap-2.5'
      };
  }
};

/**
 * Get intent-specific styles for the switch
 */
const getIntentStyles = (intent: SwitchIntent, hasError: boolean) => {
  if (hasError) {
    return {
      track: 'bg-red-3 data-checked:bg-red-0',
      label: 'text-red-0',
      focus: 'focus-visible:ring-red-0'
    };
  }

  switch (intent) {
    case 'positive':
      return {
        track: 'bg-night-sky-blue-3 data-checked:bg-green-0',
        label: 'text-green-0',
        focus: 'focus-visible:ring-green-0'
      };
    case 'negative':
      return {
        track: 'bg-night-sky-blue-3 data-checked:bg-red-0',
        label: 'text-red-0',
        focus: 'focus-visible:ring-red-0'
      };
    case 'warning':
      return {
        track: 'bg-night-sky-blue-3 data-checked:bg-yellow-0',
        label: 'text-yellow-0',
        focus: 'focus-visible:ring-yellow-0'
      };
    case 'neutral':
    default:
      return {
        track: 'bg-night-sky-blue-3 data-checked:bg-dark-blue-0',
        label: 'text-neutral-0',
        focus: 'focus-visible:ring-dark-blue-0'
      };
  }
};

/**
 * Switch component following Design System
 * A wrapper around HeadlessUI's Switch with consistent styling and animations
 * 
 * @param props - Switch component props
 * @returns JSX.Element
 */
export function Switch({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  label,
  helperText,
  error,
  size = 'medium',
  intent = 'neutral',
  required = false,
  className = '',
  name,
  id,
  value,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  children
}: SwitchProps) {
  const sizeStyles = getSizeStyles(size);
  const intentStyles = getIntentStyles(intent, Boolean(error));
  
  // Generate accessible label
  const accessibleLabel = ariaLabel || label;
  
  // Combine describedby IDs
  const describedBy = [
    ariaDescribedBy,
    error ? `${id}-error` : undefined,
    helperText && !error ? `${id}-helper` : undefined
  ].filter(Boolean).join(' ') || undefined;

  const switchClasses = [
    // Base styles
    'group relative inline-flex items-center rounded-full transition-colors duration-200 cursor-pointer',
    // Size
    sizeStyles.track,
    // Intent and colors
    intentStyles.track,
    // Focus styles
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    intentStyles.focus,
    // Disabled state
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    // Custom classes
    className
  ].filter(Boolean).join(' ');

  const thumbClasses = [
    // Base styles
    'rounded-full bg-white transition-transform duration-200 shadow-md',
    // Size and positioning
    sizeStyles.thumb,
    sizeStyles.thumbTranslate
  ].join(' ');

  return (
    <div className="relative">
      <div className={`flex items-center ${sizeStyles.gap}`}>
        <HeadlessSwitch
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          name={name}
          value={value}
          className={switchClasses}
          aria-label={accessibleLabel}
          aria-describedby={describedBy}
          data-testid="switch"
        >
          <span className={thumbClasses} />
        </HeadlessSwitch>
        
        {/* Label and content */}
        {(label || children) && (
          <div className="flex-1 min-w-0">
            {label && (
              <label 
                htmlFor={id}
                className={`block cursor-pointer ${sizeStyles.label} ${intentStyles.label} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {label}
                {required && <span className="text-red-0 ml-1">*</span>}
              </label>
            )}
            {children}
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {error && (
        <div id={`${id}-error`} className={`mt-1 flex items-center text-red-0 ${sizeStyles.helper}`}>
          <svg 
            className="w-4 h-4 mr-1 flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.168 14.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      {/* Helper Text */}
      {helperText && !error && (
        <p id={`${id}-helper`} className={`mt-1 text-night-sky-blue-1 ${sizeStyles.helper}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export default Switch;