import { Button, type ButtonProps, type ButtonSize } from './Button';

/**
 * ButtonGroup component props interface
 */
export interface ButtonGroupProps {
  /**
   * Array of button configurations
   * Each item can contain any ButtonProps (label, beforeIcon, etc.)
   */
  items: ButtonProps[];
  
  /**
   * Size variant applied to all buttons in the group
   * @default "medium"
   */
  size?: ButtonSize;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Get position-specific styling for buttons in a group
 */
const getPositionStyles = (index: number, total: number) => {
  if (total === 1) {
    // Single button - full rounded + full border
    return 'rounded border border-night-sky-blue-3';
  }
  
  if (index === 0) {
    // First button - left rounded + full border (right border creates divider with next button)
    return 'rounded-l-lg border border-night-sky-blue-3';
  }
  
  if (index === total - 1) {
    // Last button - right rounded + top/bottom/right borders (inherits left divider from previous)
    return 'rounded-r-lg border-t border-b border-r border-night-sky-blue-3';
  }
  
  // Middle buttons - top/bottom/right borders (right border creates divider with next button)
  return 'border-t border-b border-r border-night-sky-blue-3';
};

/**
 * ButtonGroup component that creates seamlessly connected buttons
 * 
 * @param props - ButtonGroup component props
 * @returns JSX.Element
 */
export function ButtonGroup({
  items = [],
  size = "medium",
  className = ""
}: ButtonGroupProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={`inline-flex ${className}`} role="group">
      {items.map((item, index) => {
        const positionStyles = getPositionStyles(index, items.length);
        
        return (
          <Button
            key={index}
            {...item}
            type="ghost"
            size={size}
            className={`${positionStyles} ${item.className || ''}`}
          />
        );
      })}
    </div>
  );
}

export default ButtonGroup;