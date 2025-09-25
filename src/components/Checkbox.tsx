import { Checkbox as HeadlessCheckbox } from '@headlessui/react';
import { type ReactNode } from 'react';

/**
 * Checkbox size variants
 */
export type CheckboxSize = 'small' | 'medium' | 'large';

/**
 * Checkbox intent variants for different visual states
 */
export type CheckboxIntent = 'neutral' | 'positive' | 'negative' | 'warning';

/**
 * Comprehensive Checkbox component props interface
 */
export interface CheckboxProps {
  /**
   * Whether the checkbox is checked
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
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the checkbox is in an indeterminate state
   */
  indeterminate?: boolean;
  
  /**
   * Label text for the checkbox
   */
  label?: string;
  
  /**
   * Helper text displayed below the checkbox
   */
  helperText?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Size variant of the checkbox
   * @default "medium"
   */
  size?: CheckboxSize;
  
  /**
   * Intent variant affecting the color scheme
   * @default "neutral"
   */
  intent?: CheckboxIntent;
  
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
   * ID for the checkbox element
   */
  id?: string;
  
  /**
   * Value attribute for form submission
   */
  value?: string;
  
  /**
   * Accessible label for the checkbox. If not provided, will use label text.
   */
  'aria-label'?: string;
  
  /**
   * ID of element that describes this checkbox
   */
  'aria-describedby'?: string;
  
  /**
   * Additional content to render alongside the checkbox
   */
  children?: ReactNode;
}

/**
 * Get size-specific styles for the checkbox
 */
const getSizeStyles = (size: CheckboxSize) => {
  switch (size) {
    case 'small':
      return {
        checkbox: 'size-4',
        label: 'typography-label text-sm',
        helper: 'typography-body-text-sm',
        gap: 'gap-2'
      };
    case 'large':
      return {
        checkbox: 'size-6',
        label: 'typography-label-lg',
        helper: 'typography-body-text',
        gap: 'gap-3'
      };
    case 'medium':
    default:
      return {
        checkbox: 'size-5',
        label: 'typography-label',
        helper: 'typography-label-helper',
        gap: 'gap-2.5'
      };
  }
};

/**
 * Get intent-specific styles for the checkbox
 */
const getIntentStyles = (intent: CheckboxIntent, hasError: boolean) => {
  if (hasError) {
    return {
      checkbox: 'border-red-1 data-checked:bg-red-0 data-checked:border-red-0',
      label: 'text-red-0',
      focus: 'focus-visible:ring-red-0'
    };
  }

  switch (intent) {
    case 'positive':
      return {
        checkbox: 'border-green-3 data-checked:bg-green-0 data-checked:border-green-0',
        label: 'text-green-0',
        focus: 'focus-visible:ring-green-0'
      };
    case 'negative':
      return {
        checkbox: 'border-red-3 data-checked:bg-red-0 data-checked:border-red-0',
        label: 'text-red-0',
        focus: 'focus-visible:ring-red-0'
      };
    case 'warning':
      return {
        checkbox: 'border-yellow-3 data-checked:bg-yellow-0 data-checked:border-yellow-0',
        label: 'text-yellow-0',
        focus: 'focus-visible:ring-yellow-0'
      };
    case 'neutral':
    default:
      return {
        checkbox: 'border-night-sky-blue-3 data-checked:bg-dark-blue-0 data-checked:border-dark-blue-0',
        label: 'text-neutral-0',
        focus: 'focus-visible:ring-dark-blue-0'
      };
  }
};

/**
 * Checkbox component following Design System
 * A wrapper around HeadlessUI's Checkbox with consistent styling and animations
 * 
 * @param props - Checkbox component props
 * @returns JSX.Element
 */
export function Checkbox({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  indeterminate = false,
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
}: CheckboxProps) {
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

  const checkboxClasses = [
    // Base styles
    'group relative flex-shrink-0 rounded border-2 bg-white cursor-pointer',
    // Size
    sizeStyles.checkbox,
    // Intent and colors
    intentStyles.checkbox,
    // Transitions
    'transition-colors duration-150',
    // Focus styles
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    intentStyles.focus,
    // Disabled state
    disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-night-sky-blue-2',
    // Custom classes
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="relative">
      <div className={`flex items-start ${sizeStyles.gap}`}>
        <HeadlessCheckbox
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          name={name}
          value={value}
          className={checkboxClasses}
          aria-label={accessibleLabel}
          aria-describedby={describedBy}
          data-testid="checkbox"
        >
          {/* Checkmark icon */}
          <svg 
            className="stroke-white opacity-0 group-data-checked:opacity-100 transition-opacity duration-150 w-full h-full p-0.5" 
            viewBox="0 0 14 14" 
            fill="none"
            aria-hidden="true"
          >
            <path 
              d="M3 8L6 11L11 3.5" 
              strokeWidth={2} 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
          
          {/* Indeterminate state */}
          {indeterminate && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-0.5 bg-white rounded-full opacity-0 group-data-checked:opacity-100 transition-opacity duration-150" />
            </div>
          )}
        </HeadlessCheckbox>
        
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

export default Checkbox;

