import { Input as HeadlessInput } from '@headlessui/react';
import { type ComponentProps, forwardRef, type ReactElement } from 'react';
import Icon from './Icon';

/**
 * Input size variants
 */
export type InputSize = 'small' | 'medium' | 'large';

/**
 * Input intent variants for different visual states
 */
export type InputIntent = 'neutral' | 'informative' | 'positive' | 'warning' | 'negative';

/**
 * Input type variants
 */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'url' | 'tel' | 'search';

/**
 * Comprehensive Input component props interface
 */
export interface InputProps extends Omit<ComponentProps<'input'>, 'size' | 'type'> {
  /**
   * Label for the input field
   */
  label?: string;
  
  /**
   * Helper text displayed below the input
   */
  helperText?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Size variant of the input
   * @default "medium"
   */
  size?: InputSize;
  
  /**
   * Intent variant affecting the color scheme
   * @default "neutral"
   */
  intent?: InputIntent;
  
  /**
   * Input type
   * @default "text"
   */
  type?: InputType;
  
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
   * Whether the input is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the input is readonly
   */
  readOnly?: boolean;
  
  /**
   * Maximum number of characters allowed
   */
  maxLength?: number;
  
  /**
   * Whether to show character count
   */
  showCharacterCount?: boolean;
  
  /**
   * Icon to display before the input text
   * Must be an Icon component instance
   */
  beforeIcon?: ReactElement | null;
  
  /**
   * Icon to display after the input text
   * Must be an Icon component instance
   */
  afterIcon?: ReactElement | null;
}

/**
 * Get size-specific styles for the input
 */
const getSizeStyles = (size: InputSize) => {
  switch (size) {
    case 'small':
      return {
        input: 'h-8 px-2 text-sm',
        label: 'typography-label text-sm',
        helper: 'typography-body-text-sm',
        icon: 'small' as const,
        iconWrapper: 'w-4 h-4'
      };
    case 'large':
      return {
        input: 'h-12 px-4 text-base',
        label: 'typography-label-lg',
        helper: 'typography-body-text',
        icon: 'large' as const,
        iconWrapper: 'w-5 h-5'
      };
    case 'medium':
    default:
      return {
        input: 'h-10 px-3 text-sm',
        label: 'typography-label',
        helper: 'typography-label-helper',
        icon: 'medium' as const,
        iconWrapper: 'w-4 h-4'
      };
  }
};

/**
 * Get intent-specific styles for the input
 */
const getIntentStyles = (intent: InputIntent, hasError: boolean) => {
  if (hasError) {
    return {
      input: 'border-red-1 focus:border-red-0 focus:ring-red-0/20',
      label: 'text-red-0'
    };
  }

  switch (intent) {
    case 'informative':
      return {
        input: 'border-dark-blue-3 focus:border-dark-blue-1 focus:ring-dark-blue-0/20',
        label: 'text-dark-blue-0'
      };
    case 'positive':
      return {
        input: 'border-green-3 focus:border-green-1 focus:ring-green-0/20',
        label: 'text-green-0'
      };
    case 'warning':
      return {
        input: 'border-yellow-3 focus:border-yellow-1 focus:ring-yellow-0/20',
        label: 'text-yellow-0'
      };
    case 'negative':
      return {
        input: 'border-red-3 focus:border-red-1 focus:ring-red-0/20',
        label: 'text-red-0'
      };
    case 'neutral':
    default:
      return {
        input: 'border-night-sky-blue-3 focus:border-dark-blue-1 focus:ring-dark-blue-0/20',
        label: 'text-neutral-0'
      };
  }
};

/**
 * Get padding adjustments based on icon presence
 */
const getPaddingAdjustments = (
  size: InputSize,
  hasBeforeIcon: boolean,
  hasAfterIcon: boolean
) => {
  const sizeStyles = getSizeStyles(size);
  
  if (size === 'small') {
    if (hasBeforeIcon && hasAfterIcon) return 'px-8';
    if (hasBeforeIcon) return 'pl-8 pr-2';
    if (hasAfterIcon) return 'pl-2 pr-8';
    return sizeStyles.input.split(' ').find(c => c.startsWith('px-')) || 'px-2';
  }
  
  if (size === 'medium') {
    if (hasBeforeIcon && hasAfterIcon) return 'px-10';
    if (hasBeforeIcon) return 'pl-10 pr-3';
    if (hasAfterIcon) return 'pl-3 pr-10';
    return sizeStyles.input.split(' ').find(c => c.startsWith('px-')) || 'px-3';
  }
  
  if (size === 'large') {
    if (hasBeforeIcon && hasAfterIcon) return 'px-12';
    if (hasBeforeIcon) return 'pl-12 pr-4';
    if (hasAfterIcon) return 'pl-4 pr-12';
    return sizeStyles.input.split(' ').find(c => c.startsWith('px-')) || 'px-4';
  }
  
  return sizeStyles.input.split(' ').find(c => c.startsWith('px-')) || 'px-3';
};

/**
 * Input component following Design System
 * A wrapper around HeadlessUI's Input with consistent styling and features
 * 
 * @param props - Input component props
 * @returns JSX.Element
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  size = 'medium',
  intent = 'neutral',
  type = 'text',
  required = false,
  className = '',
  placeholder,
  disabled = false,
  readOnly = false,
  maxLength,
  showCharacterCount = false,
  beforeIcon = null,
  afterIcon = null,
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
  
  const hasBeforeIcon = Boolean(beforeIcon);
  const hasAfterIcon = Boolean(afterIcon);
  const padding = getPaddingAdjustments(size, hasBeforeIcon, hasAfterIcon);
  
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

  const inputClasses = [
    // Base styles
    'block w-full rounded border bg-white shadow-sm transition-colors duration-200',
    // Size (height and text size)
    sizeStyles.input.split(' ').filter(c => c.startsWith('h-') || c.startsWith('text-')).join(' '),
    // Padding
    padding,
    // Intent and colors
    intentStyles.input,
    // Focus styles
    'focus:outline-none focus:ring-2',
    // Disabled/readonly state
    disabled || readOnly ? 'bg-night-sky-blue-6 cursor-not-allowed' : 'hover:border-night-sky-blue-2',
    disabled ? 'opacity-50' : '',
    // Custom classes
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="relative">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`block mb-1 text-left ${sizeStyles.label} ${intentStyles.label}`}
        >
          {label}
          {required && <span className="text-red-0 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Before Icon */}
        {hasBeforeIcon && (
          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center ${sizeStyles.iconWrapper} flex-shrink-0 pointer-events-none z-10`}>
            {(() => {
              if (typeof beforeIcon === 'string') {
                throw new Error('beforeIcon must be an Icon component instance, not a string. Use <Icon type="..." /> instead.');
              }
              return beforeIcon;
            })()}
          </div>
        )}

        {/* Input */}
        <HeadlessInput
          ref={ref}
          id={id}
          name={name}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          aria-describedby={describedBy}
          aria-invalid={error ? 'true' : undefined}
          data-testid="input"
          {...rest}
        />

        {/* After Icon */}
        {hasAfterIcon && (
          <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center ${sizeStyles.iconWrapper} flex-shrink-0 pointer-events-none z-10`}>
            {(() => {
              if (typeof afterIcon === 'string') {
                throw new Error('afterIcon must be an Icon component instance, not a string. Use <Icon type="..." /> instead.');
              }
              return afterIcon;
            })()}
          </div>
        )}
      </div>

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
          <Icon 
            type="warning" 
            size="small"
            className="text-red-0 mr-1 flex-shrink-0" 
          />
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

Input.displayName = 'Input';

export default Input;

