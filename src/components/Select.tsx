import React, { useState, useRef } from 'react';
import { Listbox } from '@headlessui/react';

/**
 * Represents an option in the select dropdown
 */
export interface SelectOption {
  /** Unique identifier for the option */
  value: string;
  /** Display text for the option */
  label: string;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Optional description text shown below the label */
  description?: string;
  /** Optional icon to display before the label */
  icon?: string;
}

/**
 * Props for the Select component
 */
export interface SelectProps {
  /** Available options for selection */
  options: SelectOption[];
  /** Currently selected value(s) */
  value?: string | string[];
  /** Default selected value(s) for uncontrolled usage */
  defaultValue?: string | string[];
  /** Callback fired when selection changes */
  onChange?: (value: string | string[]) => void;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Whether multiple options can be selected */
  multiple?: boolean;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Error message to display */
  error?: string;
  /** Whether to show loading state */
  loading?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Label for the select field */
  label?: string;
  /** Helper text displayed below the select */
  helperText?: string;
  /** Size variant of the select */
  size?: 'small' | 'medium' | 'large';
  /** Intent variant affecting the color scheme */
  intent?: 'neutral' | 'informative' | 'positive' | 'warning' | 'negative';
  /** Custom className for additional styling */
  className?: string;
  /** Name attribute for form submission */
  name?: string;
  /** ID for the select element */
  id?: string;
  /** Whether to enable search/filter functionality */
  searchable?: boolean;
  /** Callback fired when search input changes */
  onSearch?: (searchTerm: string) => void;
  /** Whether to clear search on selection */
  clearSearchOnSelect?: boolean;
}

/**
 * A comprehensive select component with support for single/multi-select,
 * search functionality, and various visual states
 */
export function Select({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = 'Select an option...',
  multiple = false,
  disabled = false,
  error,
  loading = false,
  required = false,
  label,
  helperText,
  size = 'medium',
  intent = 'neutral',
  className = '',
  name,
  id,
  searchable = false,
  onSearch,
  clearSearchOnSelect = true,
}: SelectProps) {
  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue || (multiple ? [] : '')
  );
  const [searchTerm, setSearchTerm] = useState('');
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Use controlled or uncontrolled value
  const currentValue = value !== undefined ? value : internalValue;

  // Filter options based on search term
  const filteredOptions = searchable && searchTerm
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Get size-specific classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          trigger: 'h-8 px-2 text-sm',
          option: 'px-2 py-1 text-sm',
          icon: 'small' as const,
          iconWrapper: 'w-4 h-4',
          label: 'typography-label text-sm',
          search: 'h-8 px-2 text-sm'
        };
      case 'large':
        return {
          trigger: 'h-12 px-4 text-base',
          option: 'px-4 py-3 text-base',
          icon: 'large' as const,
          iconWrapper: 'w-6 h-6',
          label: 'typography-label-lg',
          search: 'h-10 px-3 text-base'
        };
      default:
        return {
          trigger: 'h-10 px-3 text-sm',
          option: 'px-3 py-2 text-sm',
          icon: 'medium' as const,
          iconWrapper: 'w-5 h-5',
          label: 'typography-label',
          search: 'h-9 px-3 text-sm'
        };
    }
  };

  // Get intent-specific classes
  const getIntentClasses = () => {
    if (error) {
      return {
        trigger: 'border-red-1 focus:border-red-0 focus:ring-red-0/20',
        label: 'text-red-0'
      };
    }

    switch (intent) {
      case 'informative':
        return {
          trigger: 'border-dark-blue-3 focus:border-dark-blue-1 focus:ring-dark-blue-0/20',
          label: 'text-dark-blue-0'
        };
      case 'positive':
        return {
          trigger: 'border-green-3 focus:border-green-1 focus:ring-green-0/20',
          label: 'text-green-0'
        };
      case 'warning':
        return {
          trigger: 'border-yellow-3 focus:border-yellow-1 focus:ring-yellow-0/20',
          label: 'text-yellow-0'
        };
      case 'negative':
        return {
          trigger: 'border-red-3 focus:border-red-1 focus:ring-red-0/20',
          label: 'text-red-0'
        };
      default:
        return {
          trigger: 'border-night-sky-blue-3 focus:border-dark-blue-1 focus:ring-dark-blue-0/20',
          label: 'text-neutral-0'
        };
    }
  };

  const sizeClasses = getSizeClasses();
  const intentClasses = getIntentClasses();

  // Handle value changes
  const handleValueChange = (newValue: string | string[]) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };


  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch?.(newSearchTerm);
  };

  // Get display value
  const getDisplayValue = () => {
    if (multiple && Array.isArray(currentValue)) {
      if (currentValue.length === 0) return placeholder;
      if (currentValue.length === 1) {
        const option = options.find(opt => opt.value === currentValue[0]);
        return option?.label || currentValue[0];
      }
      return `${currentValue.length} items selected`;
    }
    
    if (!multiple && typeof currentValue === 'string' && currentValue) {
      const option = options.find(opt => opt.value === currentValue);
      return option?.label || currentValue;
    }
    
    return placeholder;
  };

  // Check if option is selected
  const isOptionSelected = (optionValue: string) => {
    if (multiple && Array.isArray(currentValue)) {
      return currentValue.includes(optionValue);
    }
    return currentValue === optionValue;
  };

  // Get selected options for multiple select
  const selectedOptions = multiple && Array.isArray(currentValue) 
    ? options.filter(option => currentValue.includes(option.value))
    : [];

  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={`block mb-1 text-left ${sizeClasses.label} ${intentClasses.label}`}
        >
          {label}
          {required && <span className="text-red-0 ml-1">*</span>}
        </label>
      )}

      <Listbox
        value={multiple ? selectedOptions : options.find(opt => opt.value === currentValue)}
        onChange={(selected) => {
          if (multiple && Array.isArray(selected)) {
            handleValueChange(selected.map(opt => opt.value));
          } else if (!multiple && selected) {
            handleValueChange((selected as SelectOption).value);
          }
          if (clearSearchOnSelect) {
            setSearchTerm('');
          }
        }}
        multiple={multiple}
        disabled={disabled}
        name={name}
      >
        {({ open }) => (
          <>
            <div className="relative">
              <Listbox.Button
                ref={triggerRef}
                className={`
                  relative w-full bg-white border rounded shadow-sm cursor-pointer
                  transition-colors duration-200 focus:outline-none focus:ring-2
                  ${sizeClasses.trigger}
                  ${intentClasses.trigger}
                  ${disabled ? 'opacity-50 cursor-not-allowed bg-night-sky-blue-6' : 'hover:border-night-sky-blue-2'}
                `}
                id={id}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`flex-1 truncate text-left ${
                    !currentValue || (Array.isArray(currentValue) && currentValue.length === 0) 
                      ? 'text-night-sky-blue-1' 
                      : 'text-neutral-0'
                  }`}>
                    {getDisplayValue()}
                  </span>
                  
                  <div className="flex items-center ml-2 space-x-1">
                    {loading && (
                      <div className="animate-spin">
                        <svg className={`${sizeClasses.iconWrapper} text-night-sky-blue-1`} fill="none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="32" strokeDashoffset="32">
                            <animate attributeName="stroke-dasharray" dur="2s" values="0 32;32 32;32 0;0 32" repeatCount="indefinite"/>
                          </circle>
                        </svg>
                      </div>
                    )}
                    <svg
                      className={`${sizeClasses.iconWrapper} text-night-sky-blue-1 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </Listbox.Button>

              <Listbox.Options 
                anchor="bottom"
                transition
                className="z-50 bg-white border border-night-sky-blue-3 rounded shadow-lg focus:outline-none max-h-60 overflow-auto origin-top transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
                style={{ width: triggerRef.current?.offsetWidth }}
              >
                {/* Search Input */}
                {searchable && (
                  <div className="p-2 border-b border-night-sky-blue-4">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      placeholder="Search options..."
                      className={`
                        w-full border border-night-sky-blue-3 rounded focus:border-dark-blue-1 focus:ring-2 focus:ring-dark-blue-0/20
                        focus:outline-none transition-colors duration-200
                        ${sizeClasses.search}
                      `}
                    />
                  </div>
                )}

                {/* Options List */}
                <div className="py-1">
                      {filteredOptions.length === 0 ? (
                        <div className={`${sizeClasses.option} text-night-sky-blue-1 italic`}>
                          {searchTerm ? 'No options found' : 'No options available'}
                        </div>
                      ) : (
                        filteredOptions.map((option) => {
                          const isSelected = isOptionSelected(option.value);
                          
                          return (
                            <Listbox.Option
                              key={option.value}
                              value={option}
                              disabled={option.disabled}
                              className={({ focus }) =>
                                `${sizeClasses.option} cursor-pointer transition-colors duration-150 relative
                                ${option.disabled ? 'opacity-50 cursor-not-allowed text-night-sky-blue-1' : ''}
                                ${focus && !option.disabled ? 'bg-dark-blue-7' : ''}
                                ${isSelected ? 'bg-dark-blue-6 text-dark-blue-0' : 'text-neutral-0'}
                                ${!option.disabled && !focus && !isSelected ? 'hover:bg-night-sky-blue-7' : ''}`
                              }
                            >
                              {() => (
                                <div className="flex items-center">
                                  {multiple && (
                                    <div className="mr-2">
                                      {isSelected ? (
                                        <svg className={`${sizeClasses.iconWrapper} text-dark-blue-0`} fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                        </svg>
                                      ) : (
                                        <div className={`border border-night-sky-blue-2 rounded ${
                                          sizeClasses.icon === 'small' ? 'w-4 h-4' : 
                                          sizeClasses.icon === 'large' ? 'w-5 h-5' : 'w-4 h-4'
                                        }`} />
                                      )}
                                    </div>
                                  )}
                                  
                                  {option.icon && (
                                    <span className="mr-2">
                                      {option.icon}
                                    </span>
                                  )}
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="truncate">
                                      {option.label}
                                    </div>
                                    {option.description && (
                                      <div className="text-xs text-night-sky-blue-1 truncate mt-0.5">
                                        {option.description}
                                      </div>
                                    )}
                                  </div>
                                  
                                  {!multiple && isSelected && (
                                    <svg className={`${sizeClasses.iconWrapper} ml-2 text-dark-blue-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                              )}
                            </Listbox.Option>
                          );
                        })
                      )}
                </div>
              </Listbox.Options>
            </div>
          </>
        )}
      </Listbox>

      {/* Error Message */}
      {error && (
        <div id={`${id}-error`} className="mt-1 flex items-center text-sm text-red-0">
          <svg className="w-4 h-4 text-red-0 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p id={`${id}-helper`} className="mt-1 text-sm text-night-sky-blue-1">
          {helperText}
        </p>
      )}

      {/* Hidden input for form submission */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={Array.isArray(currentValue) ? currentValue.join(',') : currentValue || ''}
        />
      )}
    </div>
  );
}

export default Select;

