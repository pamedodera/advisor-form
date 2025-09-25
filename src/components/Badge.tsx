import type { ReactElement } from 'react'
import type { IconProps } from './Icon'

export type BadgeIntent = 'neutral' | 'informative' | 'positive' | 'warning' | 'negative'

export interface BadgeProps {
  label: string
  beforeIcon?: ReactElement<IconProps> | string | null
  afterIcon?: ReactElement<IconProps> | string | null
  intent?: BadgeIntent
  /**
   * Accessible label for the badge. If not provided, will use label text.
   * Use when the visual label doesn't fully describe the badge's meaning.
   */
  'aria-label'?: string
  /**
   * Whether this badge represents a status or count that should be announced to screen readers
   */
  'aria-live'?: 'polite' | 'assertive' | 'off'
}

export function Badge({ 
  label, 
  beforeIcon, 
  afterIcon, 
  intent = 'neutral',
  'aria-label': ariaLabel,
  'aria-live': ariaLive 
}: BadgeProps) {
  // Intent-based color schemes matching the design
  const getIntentClasses = () => {
    switch (intent) {
      case 'informative':
        return 'bg-dark-blue-0 text-white'
      case 'positive':
        return 'bg-green-0 text-white'
      case 'warning':
        return 'bg-yellow-0 text-white'
      case 'negative':
        return 'bg-red-0 text-white'
      case 'neutral':
      default:
        return 'bg-night-sky-blue-0 text-white'
    }
  }

  // Check if this is an icon-only badge (no text)
  const isIconOnly = !label && (beforeIcon || afterIcon)

  // Handle icon rendering with error checking
  const renderIcon = (icon: ReactElement<IconProps> | string | null | undefined) => {
    if (!icon) return null
    
    if (typeof icon === 'string') {
      console.error('Badge: Icon prop should be a ReactElement, not a string. Use <Icon name="..." /> instead.')
      return null
    }
    
    return icon
  }

  // Generate semantic description for screen readers
  const getSemanticDescription = () => {
    const intentDescription = intent !== 'neutral' ? ` (${intent} status)` : '';
    return ariaLabel || `${label}${intentDescription}`;
  };

  return (
    <span 
      className={`inline-flex items-center gap-1 px-2 ${isIconOnly ? 'py-2' : 'py-1'} rounded text-sm font-medium ${getIntentClasses()}`}
      role="status"
      aria-label={getSemanticDescription()}
      aria-live={ariaLive || (intent === 'negative' || intent === 'warning' ? 'polite' : 'off')}
    >
      {renderIcon(beforeIcon)}
      <span aria-hidden={!!ariaLabel}>{label}</span>
      {renderIcon(afterIcon)}
    </span>
  )
}