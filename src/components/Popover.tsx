import { Popover as HeadlessPopover, PopoverButton, PopoverPanel } from '@headlessui/react';

/**
 * Props for the Popover component
 */
export interface PopoverProps {
  /** Content that triggers the popover */
  children: React.ReactNode;
  /** Content to display in the popover panel */
  content: React.ReactNode;
  /** Size variant of the popover */
  size?: 'small' | 'medium' | 'large';
  /** Intent variant affecting the color scheme */
  intent?: 'neutral' | 'informative' | 'positive' | 'warning' | 'negative';
  /** Whether the popover is disabled */
  disabled?: boolean;
  /** Custom className for additional styling */
  className?: string;
  /** Position of the popover relative to the trigger */
  placement?: 'bottom' | 'bottom start' | 'bottom end' | 'top' | 'top start' | 'top end' | 'left' | 'right';
  /** Custom width for the popover panel */
  width?: string | number;
}

/**
 * A popover component built with Headless UI Popover components
 * that follows the design system styling patterns
 */
export function Popover({
  children,
  content,
  size = 'medium',
  intent = 'neutral',
  disabled = false,
  className = '',
  placement = 'bottom',
  width,
  ...props
}: PopoverProps) {
  // Get size-specific classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          panel: 'p-2',
          maxWidth: 'max-w-xs',
        };
      case 'large':
        return {
          panel: 'p-6',
          maxWidth: 'max-w-lg',
        };
      default:
        return {
          panel: 'p-4',
          maxWidth: 'max-w-sm',
        };
    }
  };

  // Get intent-specific classes for focus states
  const getIntentClasses = () => {
    switch (intent) {
      case 'informative':
        return 'focus-visible:ring-dark-blue-0';
      case 'positive':
        return 'focus-visible:ring-green-0';
      case 'warning':
        return 'focus-visible:ring-yellow-0';
      case 'negative':
        return 'focus-visible:ring-red-0';
      default:
        return 'focus-visible:ring-dark-blue-0';
    }
  };

  const sizeClasses = getSizeClasses();
  const intentClasses = getIntentClasses();

  const panelStyle = width ? { width: typeof width === 'number' ? `${width}px` : width } : undefined;

  return (
    <HeadlessPopover className={`relative inline-block ${className}`} {...props}>
      <>
        <PopoverButton
            className={`
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              ${intentClasses}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            disabled={disabled}
          >
            {children}
          </PopoverButton>

          <PopoverPanel
            anchor={placement}
            className={`
              z-50 bg-white border border-night-sky-blue-3 rounded shadow-lg 
              transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0
              origin-top focus:outline-none
              ${sizeClasses.panel}
              ${!width ? sizeClasses.maxWidth : ''}
            `}
            style={panelStyle}
            transition
          >
            {content}
          </PopoverPanel>
      </>
    </HeadlessPopover>
  );
}

/**
 * Props for the UserProfileCard component
 */
export interface UserProfileCardProps {
  /** User's avatar image URL */
  avatarUrl: string;
  /** User's display name */
  name: string;
  /** User's email address */
  email: string;
  /** Whether the user is online */
  isOnline?: boolean;
  /** Whether the current user is following this user */
  isFollowing?: boolean;
  /** Callback when follow/unfollow button is clicked */
  onFollowToggle?: () => void;
  /** Custom className for additional styling */
  className?: string;
}

/**
 * A user profile card component designed to be used within popovers
 * Matches the design shown in the provided screenshot
 */
export function UserProfileCard({
  avatarUrl,
  name,
  email,
  isOnline = false,
  isFollowing = false,
  onFollowToggle,
  className = '',
}: UserProfileCardProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* User Info Section */}
      <div className="flex items-center space-x-3">
        {/* Avatar with Online Status */}
        <div className="relative">
          <img
            src={avatarUrl}
            alt={`${name}'s avatar`}
            className="w-12 h-12 rounded-full object-cover"
          />
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-0 border-2 border-white rounded-full"></div>
          )}
        </div>

        {/* Name and Email */}
        <div className="flex-1 min-w-0">
          <h3 className="typography-label text-neutral-0 truncate">
            {name}
          </h3>
          <p className="typography-body-text-sm text-night-sky-blue-1 truncate">
            {email}
          </p>
        </div>
      </div>

      {/* Follow Button */}
      <button
        onClick={onFollowToggle}
        className={`
          inline-flex items-center px-3 py-1.5 rounded transition-colors duration-200
          typography-button-sm font-medium focus-ring
          ${isFollowing 
            ? 'bg-night-sky-blue-6 text-night-sky-blue-0 hover:bg-night-sky-blue-5' 
            : 'bg-dark-blue-0 text-white hover:bg-dark-blue-1'
          }
        `}
      >
        {isFollowing && (
          <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
}

export default Popover;