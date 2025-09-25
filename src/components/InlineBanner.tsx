import React, { useId } from 'react';
import Icon from './Icon';
import type { IconType } from './types/Icon';

/**
 * Variant types for the InlineBanner component
 */
export type InlineBannerVariant = 'default' | 'informative' | 'success' | 'warning' | 'error';

/**
 * Props for the InlineBanner component
 */
export interface InlineBannerProps {
  /**
   * The visual variant of the banner that determines its styling and semantic meaning
   * @default 'default'
   */
  variant?: InlineBannerVariant;
  
  /**
   * The main title text for the banner
   */
  title: string;
  
  /**
   * Optional description text providing additional context
   */
  description?: string;
  
  /**
   * Action buttons or other interactive content to display in the banner
   */
  children?: React.ReactNode;
  
  /**
   * Callback function called when the close button is clicked
   * If provided, a close button will be displayed
   */
  onClose?: () => void;
  
  /**
   * Additional CSS classes to apply to the banner container
   */
  className?: string;
}

/**
 * Configuration for each banner variant including styling and accessibility
 */
const variantConfig: Record<InlineBannerVariant, {
  containerClasses: string;
  iconType: IconType;
  role: 'alert' | 'status';
  iconAlt: string;
}> = {
  default: {
    containerClasses: 'bg-night-sky-blue-7 border-night-sky-blue-3 text-night-sky-blue-dark-2',
    iconType: 'info',
    role: 'status',
    iconAlt: 'Information'
  },
  informative: {
    containerClasses: 'bg-dark-blue-7 border-dark-blue-3 text-dark-blue-dark-2',
    iconType: 'info',
    role: 'status',
    iconAlt: 'Information'
  },
  success: {
    containerClasses: 'bg-green-7 border-green-3 text-green-dark-2',
    iconType: 'check-circle',
    role: 'status',
    iconAlt: 'Success'
  },
  warning: {
    containerClasses: 'bg-yellow-7 border-yellow-3 text-yellow-dark-2',
    iconType: 'warning',
    role: 'alert',
    iconAlt: 'Warning'
  },
  error: {
    containerClasses: 'bg-red-7 border-red-3 text-red-dark-2',
    iconType: 'error',
    role: 'alert',
    iconAlt: 'Error'
  }
};

/**
 * InlineBanner component for displaying alerts, notifications, and feature highlights
 * 
 * This component provides a flexible way to display contextual information to users
 * with different visual styles based on the semantic meaning of the content.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <InlineBanner title="Welcome!" description="Thanks for joining us." />
 * 
 * // With actions
 * <InlineBanner 
 *   variant="success" 
 *   title="Success!" 
 *   description="Your changes have been saved."
 *   onClose={() => console.log('Banner closed')}
 * >
 *   <Button size="small">View Details</Button>
 * </InlineBanner>
 * ```
 */
const InlineBanner: React.FC<InlineBannerProps> = ({
  variant = 'default',
  title,
  description,
  children,
  onClose,
  className = '',
}) => {
  const titleId = useId();
  const descriptionId = useId();
  const config = variantConfig[variant];
  
  // Build ARIA attributes
  const ariaLabelledBy = titleId;
  const ariaDescribedBy = description ? descriptionId : undefined;
  
  // Handle close button click
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClose?.();
  };
  
  // Handle close button keyboard interaction
  const handleCloseKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClose?.();
    }
  };

  return (
    <div
      role={config.role}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      className={`
        relative rounded border p-5 
        ${config.containerClasses}
        ${className}
      `.trim()}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div className="flex h-6 items-center">
          <Icon
            type={config.iconType}
            size="medium"
            alt={config.iconAlt}
            className="flex-shrink-0"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-1">
            {/* Title */}
            <div
              id={titleId}
              className="typography-label text-current font-semibold"
            >
              {title}
            </div>

            {/* Description */}
            {description && (
              <div
                id={descriptionId}
                className="typography-body-text text-current"
              >
                {description}
              </div>
            )}
          </div>

          {/* Actions */}
          {children && (
            <div className="mt-4 flex gap-2">
              {children}
            </div>
          )}
        </div>

        {/* Close Button */}
        {onClose && (
          <div className="flex h-6 items-center">
            <button
              type="button"
              onClick={handleClose}
              onKeyDown={handleCloseKeyDown}
              className="flex h-8 w-8 items-center justify-center rounded hover:bg-black/10 focus-ring-inset transition-colors"
              aria-label="Close banner"
            >
              <Icon
                type="close"
                size="medium"
                decorative
                className="text-current"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InlineBanner;