import { Description, Dialog as HeadlessDialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { type ReactNode } from 'react';
import Icon from './Icon';

/**
 * Dialog size variants
 */
export type DialogSize = 'small' | 'medium' | 'large' | 'extra-large';

/**
 * Comprehensive Dialog component props interface
 */
export interface DialogProps {
  /**
   * Whether the dialog is open
   */
  open: boolean;
  
  /**
   * Callback when dialog should close
   */
  onClose: () => void;
  
  /**
   * Dialog title
   */
  title?: string;
  
  /**
   * Dialog description
   */
  description?: string;
  
  /**
   * Size variant of the dialog
   * @default "medium"
   */
  size?: DialogSize;
  
  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;
  
  /**
   * Additional CSS classes for the dialog panel
   */
  className?: string;
  
  /**
   * Dialog content
   */
  children: ReactNode;
  
  /**
   * Footer content (typically buttons)
   */
  footer?: ReactNode;
  
  /**
   * Whether to prevent closing on backdrop click
   * @default false
   */
  preventBackdropClose?: boolean;
  
  /**
   * Whether to prevent closing on escape key
   * @default false
   */
  preventEscapeClose?: boolean;
}

/**
 * Get size-specific styles for the dialog
 */
const getSizeStyles = (size: DialogSize) => {
  switch (size) {
    case 'small':
      return 'max-w-md';
    case 'large':
      return 'max-w-4xl';
    case 'extra-large':
      return 'max-w-6xl';
    case 'medium':
    default:
      return 'max-w-lg';
  }
};

/**
 * Dialog component following Design System
 * Built on HeadlessUI Dialog with consistent styling
 * 
 * @param props - Dialog component props
 * @returns JSX.Element
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  size = 'medium',
  showCloseButton = true,
  className = '',
  children,
  footer,
  preventBackdropClose = false,
  preventEscapeClose = false
}: DialogProps) {
  const sizeClasses = getSizeStyles(size);
  
  const handleClose = () => {
    if (!preventBackdropClose) {
      onClose();
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && preventEscapeClose) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  return (
    <HeadlessDialog 
      open={open} 
      onClose={handleClose} 
      className="relative z-50"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-neutral-0/50 backdrop-blur-sm" aria-hidden="true" />
      
      {/* Dialog container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel 
          className={`
            w-full ${sizeClasses} bg-white rounded shadow-xl border border-night-sky-blue-3
            ${className}
          `}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-night-sky-blue-4">
              <div className="flex-1 min-w-0">
                {title && (
                  <DialogTitle className="typography-h4 text-neutral-0 truncate">
                    {title}
                  </DialogTitle>
                )}
                {description && (
                  <Description className="mt-1 typography-body-text text-night-sky-blue-1">
                    {description}
                  </Description>
                )}
              </div>
              
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="ml-4 p-2 text-night-sky-blue-1 hover:text-neutral-0 hover:bg-night-sky-blue-7 
                           rounded transition-colors duration-200 focus-visible:outline-none 
                           focus-visible:ring-2 focus-visible:ring-dark-blue-0 focus-visible:ring-offset-2"
                  aria-label="Close dialog"
                >
                  <Icon type="close" size="medium" />
                </button>
              )}
            </div>
          )}
          
          {/* Content */}
          <div className="p-6">
            {children}
          </div>
          
          {/* Footer */}
          {footer && (
            <div className="flex items-center justify-end gap-3 p-6 border-t border-night-sky-blue-4 bg-night-sky-blue-8 rounded-b-lg">
              {footer}
            </div>
          )}
        </DialogPanel>
      </div>
    </HeadlessDialog>
  );
}

export default Dialog;