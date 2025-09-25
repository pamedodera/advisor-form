import { useState } from 'react';

/**
 * Props for the Tooltip component
 */
export interface TooltipProps {
  /** Content to display in the tooltip */
  content: string | React.ReactNode;
  /** Element that triggers the tooltip */
  children: React.ReactNode;
  /** Position of the tooltip relative to the trigger */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Position of the arrow within the tooltip */
  arrowPosition?: 'start' | 'middle' | 'end';
  /** Size variant of the tooltip */
  size?: 'small' | 'medium' | 'large';
  /** Whether the tooltip is disabled */
  disabled?: boolean;
  /** Custom className for additional styling */
  className?: string;
}

/**
 * A tooltip component that provides quick informational content on hover/focus
 * Built with pure CSS positioning for reliable hover interactions
 */
export function Tooltip({
  content,
  children,
  placement = 'top',
  arrowPosition = 'middle',
  size = 'medium',
  disabled = false,
  className = '',
  ...props
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Get size-specific classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          panel: 'px-2 py-1',
          text: 'typography-body-text-sm',
          maxWidth: 'max-w-xs',
        };
      case 'large':
        return {
          panel: 'px-4 py-3',
          text: 'typography-body-text',
          maxWidth: 'max-w-sm',
        };
      default:
        return {
          panel: 'px-3 py-2',
          text: 'typography-body-text-sm',
          maxWidth: 'max-w-xs',
        };
    }
  };

  // Get positioning classes for the tooltip panel
  const getPositionClasses = () => {
    const baseClasses = 'absolute z-50';
    
    switch (placement) {
      case 'top':
        return `${baseClasses} bottom-full mb-2`;
      case 'bottom':
        return `${baseClasses} top-full mt-2`;
      case 'left':
        return `${baseClasses} right-full mr-2 top-1/2 -translate-y-1/2`;
      case 'right':
        return `${baseClasses} left-full ml-2 top-1/2 -translate-y-1/2`;
    }
  };

  // Get arrow positioning classes based on placement and arrow position
  const getArrowClasses = () => {
    const baseArrowClasses = 'absolute w-0 h-0';
    
    // Arrow positioning based on placement and arrowPosition
    const getArrowPosition = () => {
      switch (arrowPosition) {
        case 'start':
          return placement === 'top' || placement === 'bottom' 
            ? 'left-3' 
            : 'top-2';
        case 'end':
          return placement === 'top' || placement === 'bottom' 
            ? 'right-3' 
            : 'bottom-2';
        default: // middle
          return placement === 'top' || placement === 'bottom' 
            ? 'left-1/2 -translate-x-1/2' 
            : 'top-1/2 -translate-y-1/2';
      }
    };

    switch (placement) {
      case 'top':
        return `${baseArrowClasses} ${getArrowPosition()} -bottom-1.5 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-neutral-dark-1`;
      case 'bottom':
        return `${baseArrowClasses} ${getArrowPosition()} -top-1.5 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-neutral-dark-1`;
      case 'left':
        return `${baseArrowClasses} ${getArrowPosition()} -right-1.5 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-neutral-dark-1`;
      case 'right':
        return `${baseArrowClasses} ${getArrowPosition()} -left-1.5 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-neutral-dark-1`;
    }
  };

  const sizeClasses = getSizeClasses();
  const positionClasses = getPositionClasses();
  const arrowClasses = getArrowClasses();

  if (disabled) {
    return <span className={className}>{children}</span>;
  }

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      {...props}
    >
      {children}
      
      {isVisible && (
        <div
          className={`
            bg-neutral-dark-1 text-white-0 rounded-md shadow-lg
            ${positionClasses}
            ${sizeClasses.panel}
            ${sizeClasses.text}
            ${sizeClasses.maxWidth}
          `}
          role="tooltip"
        >
          {/* Arrow */}
          <div className={arrowClasses}></div>
          
          {content}
        </div>
      )}
    </div>
  );
}

export default Tooltip;