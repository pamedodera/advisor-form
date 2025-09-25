import { Field, Label, Radio, RadioGroup as HeadlessRadioGroup } from '@headlessui/react';
import { type ReactNode } from 'react';

/**
 * Radio option interface
 */
export interface RadioOption {
  /** Unique value for the radio option */
  value: string;
  /** Display label for the radio option */
  label: string;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Optional description text shown below the label */
  description?: string;
}

/**
 * RadioGroup size variants
 */
export type RadioGroupSize = 'small' | 'medium' | 'large';

/**
 * RadioGroup intent variants for different visual states
 */
export type RadioGroupIntent = 'neutral' | 'positive' | 'negative' | 'warning';

/**
 * Comprehensive RadioGroup component props interface
 */
export interface RadioGroupProps {
  /**
   * Available radio options
   */
  options: RadioOption[];
  
  /**
   * Currently selected value
   */
  value?: string;
  
  /**
   * Default selected value for uncontrolled usage
   */
  defaultValue?: string;
  
  /**
   * Callback fired when the selected value changes
   */
  onChange?: (value: string) => void;
  
  /**
   * Whether the radio group is disabled
   */
  disabled?: boolean;
  
  /**
   * Label text for the radio group
   */
  label?: string;
  
  /**
   * Helper text displayed below the radio group
   */
  helperText?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Size variant of the radio group
   * @default "medium"
   */
  size?: RadioGroupSize;
  
  /**
   * Intent variant affecting the color scheme
   * @default "neutral"
   */
  intent?: RadioGroupIntent;
  
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
   * ID for the radio group element
   */
  id?: string;
  
  /**
   * Accessible label for the radio group. If not provided, will use label text.
   */
  'aria-label'?: string;
  
  /**
   * ID of element that describes this radio group
   */
  'aria-describedby'?: string;
  
  /**
   * Additional content to render alongside the radio group
   */
  children?: ReactNode;
}

/**
 * Get size-specific styles for the radio group
 */
const getSizeStyles = (size: RadioGroupSize) => {
  switch (size) {
    case 'small':
      return {
        radio: 'size-4',
        label: 'typography-label text-sm',
        description: 'typography-body-text-sm',
        helper: 'typography-body-text-sm',
        gap: 'gap-2',
        itemGap: 'gap-3'
      };
    case 'large':
      return {
        radio: 'size-6',
        label: 'typography-label-lg',
        description: 'typography-body-text',
        helper: 'typography-body-text',
        gap: 'gap-3',
        itemGap: 'gap-4'
      };
    case 'medium':
    default:
      return {
        radio: 'size-5',
        label: 'typography-label',
        description: 'typography-label-helper',
        helper: 'typography-label-helper',
        gap: 'gap-2.5',
        itemGap: 'gap-3'
      };
  }
};

/**
 * Get intent-specific styles for the radio group
 */
const getIntentStyles = (intent: RadioGroupIntent, hasError: boolean) => {
  if (hasError) {
    return {
      radio: 'border-red-1 data-checked:bg-red-0 data-checked:border-red-0',
      label: 'text-red-0',
      focus: 'focus-visible:ring-red-0'
    };
  }

  switch (intent) {
    case 'positive':
      return {
        radio: 'border-green-3 data-checked:bg-green-0 data-checked:border-green-0',
        label: 'text-green-0',
        focus: 'focus-visible:ring-green-0'
      };
    case 'negative':
      return {
        radio: 'border-red-3 data-checked:bg-red-0 data-checked:border-red-0',
        label: 'text-red-0',
        focus: 'focus-visible:ring-red-0'
      };
    case 'warning':
      return {
        radio: 'border-yellow-3 data-checked:bg-yellow-0 data-checked:border-yellow-0',
        label: 'text-yellow-0',
        focus: 'focus-visible:ring-yellow-0'
      };
    case 'neutral':
    default:
      return {
        radio: 'border-night-sky-blue-3 data-checked:bg-dark-blue-0 data-checked:border-dark-blue-0',
        label: 'text-neutral-0',
        focus: 'focus-visible:ring-dark-blue-0'
      };
  }
};

/**
 * RadioGroup component following Design System
 * A wrapper around HeadlessUI's RadioGroup with consistent styling and animations
 * 
 * @param props - RadioGroup component props
 * @returns JSX.Element
 */
export function RadioGroup({
  options,
  value,
  defaultValue,
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
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  children
}: RadioGroupProps) {
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

  const radioClasses = [
    // Base styles
    'group relative flex-shrink-0 rounded-full border-2 bg-white cursor-pointer',
    // Size
    sizeStyles.radio,
    // Intent and colors
    intentStyles.radio,
    // Transitions
    'transition-colors duration-150',
    // Focus styles
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    intentStyles.focus,
    // Disabled state
    disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-night-sky-blue-2'
  ].filter(Boolean).join(' ');

  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      {label && (
        <div className="mb-3">
          <label 
            className={`block ${sizeStyles.label} ${intentStyles.label}`}
          >
            {label}
            {required && <span className="text-red-0 ml-1">*</span>}
          </label>
        </div>
      )}

      <HeadlessRadioGroup
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        name={name}
        aria-label={accessibleLabel}
        aria-describedby={describedBy}
        data-testid="radio-group"
      >
        <div className={`flex flex-col ${sizeStyles.itemGap}`}>
          {options.map((option) => (
            <Field key={option.value} className={`flex items-start ${sizeStyles.gap}`}>
              <Radio
                value={option.value}
                disabled={option.disabled}
                className={radioClasses}
              >
                {/* Radio dot */}
                <span className="invisible size-2 rounded-full bg-white group-data-checked:visible transition-opacity duration-150" />
              </Radio>
              
              {/* Label and content */}
              <div className="flex-1 min-w-0">
                <Label 
                  className={`block cursor-pointer ${sizeStyles.label} ${intentStyles.label} ${disabled || option.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {option.label}
                </Label>
                {option.description && (
                  <div className={`mt-1 text-night-sky-blue-1 ${sizeStyles.description}`}>
                    {option.description}
                  </div>
                )}
              </div>
            </Field>
          ))}
        </div>
      </HeadlessRadioGroup>
      
      {children}
      
      {/* Error Message */}
      {error && (
        <div id={`${id}-error`} className={`mt-2 flex items-center text-red-0 ${sizeStyles.helper}`}>
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
        <p id={`${id}-helper`} className={`mt-2 text-night-sky-blue-1 ${sizeStyles.helper}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export default RadioGroup;