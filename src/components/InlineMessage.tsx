import React, { useId } from 'react';
import Icon from './Icon';
import type { IconType } from './types/Icon';

/**
 * Variant types for the InlineMessage component
 */
export type InlineMessageVariant = 'informative' | 'success' | 'warning' | 'error';

/**
 * Props for the InlineMessage component
 */
export interface InlineMessageProps {
  /**
   * The visual variant of the message that determines its styling and semantic meaning
   * @default 'informative'
   */
  variant?: InlineMessageVariant;
  
  /**
   * The main title text for the message
   */
  title: string;
  
  /**
   * Optional description text providing additional context
   */
  description?: string;
  
  /**
   * Additional CSS classes to apply to the message container
   */
  className?: string;
}

/**
 * Configuration for each message variant including styling and accessibility
 */
const variantConfig: Record<InlineMessageVariant, {
  containerClasses: string;
  iconType: IconType;
  role: 'alert' | 'status';
  iconAlt: string;
}> = {
  informative: {
    containerClasses: 'bg-dark-blue-8 border-dark-blue-3 text-dark-blue-dark-2',
    iconType: 'info',
    role: 'status',
    iconAlt: 'Information'
  },
  success: {
    containerClasses: 'bg-green-8 border-green-3 text-green-dark-2',
    iconType: 'check-circle',
    role: 'status',
    iconAlt: 'Success'
  },
  warning: {
    containerClasses: 'bg-yellow-8 border-yellow-3 text-yellow-dark-2',
    iconType: 'warning',
    role: 'alert',
    iconAlt: 'Warning'
  },
  error: {
    containerClasses: 'bg-red-8 border-red-3 text-red-dark-2',
    iconType: 'error',
    role: 'alert',
    iconAlt: 'Error'
  }
};

/**
 * InlineMessage component for displaying compact contextual messages
 * 
 * This component provides a lightweight way to display status messages, alerts,
 * and informational content inline with other content. It's designed to be more
 * compact than InlineBanner and focuses on simple text-based messaging.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <InlineMessage title="Success!" description="Your changes have been saved." variant="success" />
 * 
 * // Warning message
 * <InlineMessage 
 *   variant="warning" 
 *   title="Action Required" 
 *   description="Please verify your email address."
 * />
 * ```
 */
const InlineMessage: React.FC<InlineMessageProps> = ({
  variant = 'informative',
  title,
  description,
  className = '',
}) => {
  const titleId = useId();
  const descriptionId = useId();
  const config = variantConfig[variant];
  
  // Build ARIA attributes
  const ariaLabelledBy = titleId;
  const ariaDescribedBy = description ? descriptionId : undefined;

  return (
    <div
      role={config.role}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      className={`
        flex items-start gap-3 rounded border px-4 py-3
        ${config.containerClasses}
        ${className}
      `.trim()}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        <Icon
          type={config.iconType}
          size="small"
          alt={config.iconAlt}
          className="text-current"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        <div
          id={titleId}
          className="typography-label font-semibold text-current"
        >
          {title}
        </div>

        {/* Description */}
        {description && (
          <div
            id={descriptionId}
            className="mt-1 typography-body-text-sm text-current"
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export default InlineMessage;