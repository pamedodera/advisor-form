import { type ReactElement } from 'react';
import { Button } from './Button';
import Icon from './Icon';
import { type IconProps } from './Icon';

/**
 * Toast intent variants - limited subset for toast notifications
 */
export type ToastIntent = 'neutral' | 'informative' | 'success' | 'warning' | 'negative';

/**
 * Toast action interface
 */
export interface ToastAction {
  /**
   * Action button label
   */
  label: string;
  
  /**
   * Action click handler
   */
  onClick: () => void;
  
  /**
   * Whether to underline the action text
   * @default false
   */
  underline?: boolean;
}

/**
 * Toast component props interface
 */
export interface ToastProps {
  /**
   * The main toast message text
   * @default "Toast message"
   */
  label?: string;
  
  /**
   * Toast intent variant
   * @default "neutral"
   */
  intent?: ToastIntent;
  
  /**
   * Icon to display before the toast text
   * If not provided, intent will determine the default icon automatically
   * Pass null to explicitly force no icon
   */
  beforeIcon?: ReactElement<IconProps> | null;
  
  /**
   * Close handler - when provided, shows close button
   */
  onClose?: () => void;
  
  /**
   * Optional actions (max 2)
   */
  actions?: ToastAction[];
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Get the default icon for each intent
 */
const getDefaultIcon = (intent: ToastIntent): ReactElement<IconProps> | null => {
  switch (intent) {
    case 'informative':
      return <Icon type="info" size="medium" />;
    case 'success':
      return <Icon type="check-circle" size="medium" />;
    case 'warning':
      return <Icon type="warning" size="medium" />;
    case 'negative':
      return <Icon type="error" size="medium" />;
    case 'neutral':
    default:
      return null;
  }
};

/**
 * Get button props for each toast intent to ensure color consistency
 */
const getActionButtonProps = (intent: ToastIntent) => {
  switch (intent) {
    case 'success':
      return {
        intent: 'success' as const,
        appearance: 'primary' as const,
        className: ''
      };
    case 'negative':
      return {
        intent: 'destructive' as const,
        appearance: 'primary' as const,
        className: ''
      };
    case 'informative':
      return {
        intent: 'none' as const,
        appearance: 'primary' as const,
        className: 'text-dark-blue-0 hover:text-dark-blue-1'
      };
    case 'warning':
      return {
        intent: 'none' as const,
        appearance: 'primary' as const,
        className: 'text-yellow-0 hover:text-yellow-1'
      };
    case 'neutral':
    default:
      return {
        intent: 'none' as const,
        appearance: 'secondary' as const,
        className: 'text-neutral-0 hover:text-neutral-1'
      };
  }
};

/**
 * Get intent-specific styling
 */
const getIntentStyles = (intent: ToastIntent) => {
  switch (intent) {
    case 'informative':
      return {
        bg: 'bg-dark-blue-8',
        border: 'border-dark-blue-3',
        text: 'text-dark-blue-0',
        iconColor: 'text-dark-blue-0'
      };
    case 'success':
      return {
        bg: 'bg-green-8',
        border: 'border-green-3',
        text: 'text-green-0',
        iconColor: 'text-green-0'
      };
    case 'warning':
      return {
        bg: 'bg-yellow-8',
        border: 'border-yellow-3',
        text: 'text-yellow-0',
        iconColor: 'text-yellow-0'
      };
    case 'negative':
      return {
        bg: 'bg-red-8',
        border: 'border-red-3',
        text: 'text-red-0',
        iconColor: 'text-red-0'
      };
    case 'neutral':
    default:
      return {
        bg: 'bg-neutral-8',
        border: 'border-neutral-3',
        text: 'text-neutral-0',
        iconColor: 'text-neutral-0'
      };
  }
};

/**
 * Toast component for displaying notifications
 * Does not handle positioning or animations - that's handled by parent components
 * 
 * @param props - Toast component props
 * @returns JSX.Element
 */
export function Toast({
  label = "Toast message",
  intent = "neutral",
  beforeIcon,
  onClose,
  actions = [],
  className = ""
}: ToastProps) {
  const styles = getIntentStyles(intent);
  const actionButtonProps = getActionButtonProps(intent);
  
  // Use provided icon, or get default for intent if not explicitly set
  const displayIcon = beforeIcon !== undefined ? beforeIcon : getDefaultIcon(intent);
  
  // Limit actions to 2
  const limitedActions = actions.slice(0, 2);
  
  // Add extra right padding when we have actions but no close button to match spacing
  const hasActions = limitedActions.length > 0;
  const extraSpacing = hasActions && !onClose ? 'pr-6' : '';
  
  const baseClasses = [
    'inline-flex items-center gap-3 p-4 rounded border shadow-sm min-h-[56px]',
    styles.bg,
    styles.border,
    styles.text,
    extraSpacing,
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={baseClasses}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      {displayIcon && (
        <div className={`flex-shrink-0 ${styles.iconColor}`}>
          {displayIcon}
        </div>
      )}
      
      {/* Message */}
      <div className="typography-body-text">
        {label}
      </div>
      
      {/* Actions */}
      {limitedActions.length > 0 && (
        <div className="flex gap-2 flex-shrink-0">
          {limitedActions.map((action, index) => (
            <Button
              key={index}
              label={action.label}
              type="bare"
              appearance={actionButtonProps.appearance}
              intent={actionButtonProps.intent}
              size="small"
              onClick={action.onClick}
              className={`${actionButtonProps.className} ${action.underline ? 'underline' : ''}`}
            />
          ))}
        </div>
      )}
      
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className={`flex-shrink-0 p-1 rounded hover:bg-white-a-6 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-blue-0 focus-visible:ring-offset-2 ${styles.iconColor}`}
          aria-label="Close notification"
        >
          <Icon type="close" size="medium" />
        </button>
      )}
    </div>
  );
}

export default Toast;