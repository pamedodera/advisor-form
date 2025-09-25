import { type ReactNode } from 'react';

/**
 * Loader variant types based on Figma design
 */
export type LoaderVariant = 'primary' | 'inverted' | 'white' | 'greyscale';

/**
 * Loader size options
 */
export type LoaderSize = 'small' | 'medium' | 'large';

/**
 * Loader animation state
 */
export type LoaderState = 'static' | 'spinning';

/**
 * Comprehensive Loader component props interface
 */
export interface LoaderProps {
  /**
   * The visual variant of the loader
   * @default "primary"
   */
  variant?: LoaderVariant;
  
  /**
   * The size of the loader
   * @default "medium"
   */
  size?: LoaderSize;
  
  /**
   * Whether the loader should spin or remain static
   * @default "spinning"
   */
  state?: LoaderState;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Accessible label for screen readers
   * @default "Loading..."
   */
  'aria-label'?: string;
  
  /**
   * Optional children to display alongside the loader
   */
  children?: ReactNode;
}

/**
 * Get size-specific dimensions for the loader
 */
const getSizeStyles = (size: LoaderSize) => {
  switch (size) {
    case 'small':
      return {
        width: 'w-6', // 24px
        height: 'h-6', // 24px
        strokeWidth: '2'
      };
    case 'large':
      return {
        width: 'w-12', // 48px
        height: 'h-12', // 48px
        strokeWidth: '2'
      };
    case 'medium':
    default:
      return {
        width: 'w-8', // 32px
        height: 'h-8', // 32px
        strokeWidth: '2'
      };
  }
};

/**
 * Get variant-specific color styles
 */
const getVariantStyles = (variant: LoaderVariant) => {
  switch (variant) {
    case 'primary':
      return {
        background: 'text-dark-blue-5', // Light blue background circle
        progress: 'text-dark-blue-0' // Dark blue progress
      };
    case 'inverted':
      return {
        background: 'text-dark-blue-3', // Medium blue background
        progress: 'text-dark-blue-dark-1' // Very dark blue progress
      };
    case 'white':
      return {
        background: 'text-white/30', // Semi-transparent white background
        progress: 'text-white' // White progress
      };
    case 'greyscale':
    default:
      return {
        background: 'text-neutral-4', // Light grey background
        progress: 'text-neutral-0' // Dark grey progress
      };
  }
};

/**
 * Progress Circle Loader Component
 * 
 * A versatile loader component with multiple variants and sizes,
 * following the design system patterns from Figma.
 * 
 * @param props - Loader component props
 * @returns JSX.Element
 */
export function Loader({
  variant = "primary",
  size = "medium",
  state = "spinning",
  className = "",
  'aria-label': ariaLabel = "Loading...",
  children
}: LoaderProps) {
  const sizeStyles = getSizeStyles(size);
  const variantStyles = getVariantStyles(variant);
  
  // Animation class
  const animationClass = state === 'spinning' ? 'animate-spin' : '';
  
  // SVG dimensions based on size
  const viewBoxSize = size === 'small' ? 24 : size === 'large' ? 48 : 32;
  const radius = (viewBoxSize - 4) / 2; // Account for stroke width
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${circumference * 0.75} ${circumference}`;
  
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    sizeStyles.width,
    sizeStyles.height,
    animationClass,
    className
  ].filter(Boolean).join(' ');
  
  const loaderElement = (
    <svg
      className={baseClasses}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
    >
      {/* Background circle */}
      <circle
        cx={viewBoxSize / 2}
        cy={viewBoxSize / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={sizeStyles.strokeWidth}
        className={variantStyles.background}
      />
      {/* Progress arc */}
      <circle
        cx={viewBoxSize / 2}
        cy={viewBoxSize / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={sizeStyles.strokeWidth}
        strokeLinecap="round"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={circumference * 0.25}
        className={variantStyles.progress}
        transform={`rotate(-90 ${viewBoxSize / 2} ${viewBoxSize / 2})`}
      />
    </svg>
  );
  
  // If children are provided, wrap in a container
  if (children) {
    return (
      <div className="inline-flex items-center gap-3">
        {loaderElement}
        {children}
      </div>
    );
  }
  
  return loaderElement;
}

export default Loader;