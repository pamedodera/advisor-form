import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

/**
 * Represents an item in the dropdown menu
 */
export interface DropdownItem {
  /** Unique identifier for the item */
  id: string;
  /** Display text for the item */
  label: string;
  /** Optional description text shown below the label */
  description?: string;
  /** Optional icon to display before the label */
  icon?: string;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Click handler for the item */
  onClick?: () => void;
  /** Optional href for links */
  href?: string;
  /** Whether the item is destructive (uses red colors) */
  destructive?: boolean;
}

/**
 * Props for the Dropdown component
 */
export interface DropdownProps {
  /** Items to display in the dropdown */
  items: DropdownItem[];
  /** Trigger element content */
  children: React.ReactNode;
  /** Size variant of the dropdown */
  size?: 'small' | 'medium' | 'large';
  /** Intent variant affecting the color scheme */
  intent?: 'neutral' | 'informative' | 'positive' | 'warning' | 'negative';
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Custom className for additional styling */
  className?: string;
  /** Position of the dropdown relative to the trigger */
  placement?: 'bottom' | 'bottom start' | 'bottom end' | 'top' | 'top start' | 'top end';
  /** Whether to show a divider before destructive items */
  showDestructiveDivider?: boolean;
}

/**
 * A dropdown menu component built with Headless UI Menu components
 * that follows the design system styling patterns
 */
export function Dropdown({
  items,
  children,
  size = 'medium',
  intent = 'neutral',
  disabled = false,
  className = '',
  placement = 'bottom start',
  showDestructiveDivider = true,
  ...props
}: DropdownProps) {
  // Get size-specific classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          item: 'px-2 py-1 text-sm',
          icon: 'w-4 h-4',
        };
      case 'large':
        return {
          item: 'px-4 py-3 text-base',
          icon: 'w-5 h-5',
        };
      default:
        return {
          item: 'px-3 py-2 text-sm',
          icon: 'w-4 h-4',
        };
    }
  };

  // Get intent-specific classes for the trigger button
  const getIntentClasses = () => {
    switch (intent) {
      case 'informative':
        return 'focus:ring-dark-blue-0/20';
      case 'positive':
        return 'focus:ring-green-0/20';
      case 'warning':
        return 'focus:ring-yellow-0/20';
      case 'negative':
        return 'focus:ring-red-0/20';
      default:
        return 'focus:ring-dark-blue-0/20';
    }
  };

  const sizeClasses = getSizeClasses();
  const intentClasses = getIntentClasses();

  // Check if we need to show a divider before destructive items
  const needsDivider = showDestructiveDivider && items.some(item => item.destructive);
  const nonDestructiveItems = items.filter(item => !item.destructive);
  const destructiveItems = items.filter(item => item.destructive);

  const renderMenuItem = (item: DropdownItem) => {
    const itemContent = (
      <div className="flex items-center w-full">
        {item.icon && (
          <span className={`mr-2 ${sizeClasses.icon} flex-shrink-0`}>
            {item.icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="truncate">
            {item.label}
          </div>
          {item.description && (
            <div className="text-xs text-night-sky-blue-1 truncate mt-0.5">
              {item.description}
            </div>
          )}
        </div>
      </div>
    );

    const itemClasses = `
      ${sizeClasses.item}
      w-full text-left transition-colors duration-150 cursor-pointer
      ${item.disabled ? 'opacity-50 cursor-not-allowed text-night-sky-blue-1' : ''}
      ${item.destructive && !item.disabled ? 'text-red-0 data-focus:bg-red-7 data-focus:text-red-0' : 'text-neutral-0 data-focus:bg-night-sky-blue-7'}
    `;

    if (item.href && !item.disabled) {
      return (
        <a href={item.href} className={itemClasses}>
          {itemContent}
        </a>
      );
    }

    return (
      <button
        type="button"
        className={itemClasses}
        onClick={item.disabled ? undefined : item.onClick}
        disabled={item.disabled}
      >
        {itemContent}
      </button>
    );
  };

  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`} {...props}>
      <MenuButton
        className={`
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          ${intentClasses}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        disabled={disabled}
      >
        {children}
      </MenuButton>

      <MenuItems
        anchor={placement}
        className="z-50 w-56 bg-white border border-night-sky-blue-3 rounded shadow-lg 
                   transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0
                   origin-top focus:outline-none"
        transition
      >
        <div className="py-1">
          {/* Non-destructive items */}
          {nonDestructiveItems.map((item) => (
            <MenuItem key={item.id} disabled={item.disabled}>
              {renderMenuItem(item)}
            </MenuItem>
          ))}

          {/* Divider before destructive items */}
          {needsDivider && destructiveItems.length > 0 && (
            <div className="my-1 h-px bg-night-sky-blue-4" />
          )}

          {/* Destructive items */}
          {destructiveItems.map((item) => (
            <MenuItem key={item.id} disabled={item.disabled}>
              {renderMenuItem(item)}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}

export default Dropdown;