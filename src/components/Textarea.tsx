import { Textarea as HeadlessTextarea } from '@headlessui/react';
import { type ComponentProps, forwardRef } from 'react';

/**
 * Textarea size variants
 */
export type TextareaSize = 'small' | 'medium' | 'large';

/**
 * Textarea intent variants for different visual states
 */
export type TextareaIntent = 'neutral' | 'informative' | 'positive' | 'warning' | 'negative';

/**
 * Comprehensive Textarea component props interface
 */
export interface TextareaProps extends Omit<ComponentProps<'textarea'>, 'size'> {
  /**
   * Label for the textarea field
   */
  label?: string;
  
  /**
   * Helper text displayed below the textarea
   */
  helperText?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Size variant of the textarea
   * @default "medium"
   */
  size?: TextareaSize;
  
  /**
   * Intent variant affecting the color scheme
   * @default "neutral"
   */
  intent?: TextareaIntent;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * Whether the textarea is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the textarea is readonly
   */
  readOnly?: boolean;
  
  /**
   * Number of visible text lines
   */
  rows?: number;
  
  /**
   * Maximum number of characters allowed
   */
  maxLength?: number;
  
  /**
   * Whether to show character count
   */
  showCharacterCount?: boolean;
  
  /**
   * Whether the textarea can be resized
   */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

/**
 * Get size-specific styles for the textarea
 */
const getSizeStyles = (size: TextareaSize) => {
  switch (size) {
    case 'small':
      return {
        textarea: 'min-h-20 px-2 py-1.5 text-sm',
        label: 'typography-label text-sm',
        helper: 'typography-body-text-sm'
      };
    case 'large':
      return {
        textarea: 'min-h-32 px-4 py-3 text-base',
        label: 'typography-label-lg',
        helper: 'typography-body-text'
      };
    case 'medium':
    default:
      return {
        textarea: 'min-h-24 px-3 py-2 text-sm',
        label: 'typography-label',
        helper: 'typography-label-helper'
      };
  }
};

/**
 * Get intent-specific styles for the textarea
 */
const getIntentStyles = (intent: TextareaIntent, hasError: boolean) => {
  if (hasError) {
    return {
      textarea: 'border-red-1 focus:border-red-0 focus:ring-red-0/20',
      label: 'text-red-0'
    };
  }

  switch (intent) {
    case 'informative':
      return {
        textarea: 'border-dark-blue-3 focus:border-dark-blue-1 focus:ring-dark-blue-0/20',
        label: 'text-dark-blue-0'
      };
    case 'positive':
      return {
        textarea: 'border-green-3 focus:border-green-1 focus:ring-green-0/20',
        label: 'text-green-0'
      };
    case 'warning':
      return {
        textarea: 'border-yellow-3 focus:border-yellow-1 focus:ring-yellow-0/20',
        label: 'text-yellow-0'
      };
    case 'negative':
      return {
        textarea: 'border-red-3 focus:border-red-1 focus:ring-red-0/20',
        label: 'text-red-0'
      };
    case 'neutral':
    default:
      return {
        textarea: 'border-night-sky-blue-3 focus:border-dark-blue-1 focus:ring-dark-blue-0/20',
        label: 'text-neutral-0'
      };
  }
};

/**
 * Get resize classes
 */
const getResizeClasses = (resize: TextareaProps['resize'] = 'vertical') => {
  switch (resize) {
    case 'none':
      return 'resize-none';
    case 'both':
      return 'resize';
    case 'horizontal':
      return 'resize-x';
    case 'vertical':
    default:
      return 'resize-y';
  }
};

/**
 * Textarea component following Design System
 * A wrapper around HeadlessUI's Textarea with consistent styling and features
 * 
 * @param props - Textarea component props
 * @returns JSX.Element
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  helperText,
  error,
  size = 'medium',
  intent = 'neutral',
  required = false,
  className = '',
  placeholder,
  disabled = false,
  readOnly = false,
  rows = 4,
  maxLength,
  showCharacterCount = false,
  resize = 'vertical',
  value,
  id,
  name,
  'aria-describedby': ariaDescribedBy,
  onChange,
  onBlur,
  onFocus,
  ...rest
}, ref) => {
  const sizeStyles = getSizeStyles(size);
  const intentStyles = getIntentStyles(intent, Boolean(error));
  const resizeClasses = getResizeClasses(resize);
  
  // Combine describedby IDs
  const describedBy = [
    ariaDescribedBy,
    error ? `${id}-error` : undefined,
    helperText && !error ? `${id}-helper` : undefined,
    showCharacterCount && maxLength ? `${id}-count` : undefined
  ].filter(Boolean).join(' ') || undefined;

  // Calculate character count
  const currentLength = typeof value === 'string' ? value.length : 0;
  const isNearLimit = maxLength && currentLength >= maxLength * 0.8;
  const isOverLimit = maxLength && currentLength > maxLength;

  const textareaClasses = [
    // Base styles
    'block w-full rounded border bg-white shadow-sm transition-colors duration-200',
    // Size
    sizeStyles.textarea,
    // Intent and colors
    intentStyles.textarea,
    // Resize behavior
    resizeClasses,
    // Focus styles
    'focus:outline-none focus:ring-2',
    // Disabled/readonly state
    disabled || readOnly ? 'bg-night-sky-blue-6 cursor-not-allowed' : 'hover:border-night-sky-blue-2',
    disabled ? 'opacity-50' : '',
    // Custom classes
    className
  ].filter(Boolean).join(' ');

  // TODO: Add showCopyButton? boolean. If true, show a copy button next to the textarea
  // that copies the current value to clipboard.

  return (
    <div className="relative">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`block mb-1 ${sizeStyles.label} ${intentStyles.label}`}
        >
          {label}
          {required && <span className="text-red-0 ml-1">*</span>}
        </label>
      )}

      {/* Textarea */}
      <HeadlessTextarea
        ref={ref}
        id={id}
        name={name}
        className={textareaClasses}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        aria-describedby={describedBy}
        aria-invalid={error ? 'true' : undefined}
        data-testid="textarea"
        {...rest}
      />

      {/* Character count */}
      {showCharacterCount && maxLength && (
        <div 
          id={`${id}-count`} 
          className={`mt-1 text-right ${sizeStyles.helper} ${
            isOverLimit ? 'text-red-0' : 
            isNearLimit ? 'text-yellow-0' : 
            'text-night-sky-blue-1'
          }`}
        >
          {currentLength}/{maxLength}
        </div>
      )}

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
});

Textarea.displayName = 'Textarea';

export default Textarea;