import { useState } from 'react';
import { Badge } from './Badge';
import { Checkbox } from './Checkbox';
import type { BadgeIntent } from './Badge';

export type DefinitionStatus = 'inline' | 'undefined' | 'listed' | 'unused';

interface DefinitionItemProps {
  id: string;
  name: string;
  status: DefinitionStatus;
  isSelected?: boolean;
  onSelectionChange?: (id: string, selected: boolean) => void;
  onAction?: (id: string, action: 'edit' | 'view') => void;
  className?: string;
}

const statusConfig = {
  inline: {
    label: 'Inline',
    intent: 'positive' as BadgeIntent,
  },
  undefined: {
    label: 'Undefined',
    intent: 'negative' as BadgeIntent,
  },
  listed: {
    label: 'Listed',
    intent: 'informative' as BadgeIntent,
  },
  unused: {
    label: 'Unused',
    intent: 'neutral' as BadgeIntent,
  },
} as const;

function DefinitionItem({
  id,
  name,
  status,
  isSelected = false,
  onSelectionChange,
  onAction,
  className = '',
}: DefinitionItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const statusInfo = statusConfig[status];

  const handleCheckboxChange = (checked: boolean) => {
    onSelectionChange?.(id, checked);
  };

  const handleAction = (action: 'edit' | 'view') => {
    onAction?.(id, action);
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 border border-transparent hover:bg-neutral-8 hover:border-neutral-4 transition-all duration-200 group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Checkbox */}
      <div className="flex-shrink-0">
        <Checkbox
          id={`definition-${id}`}
          checked={isSelected}
          onChange={handleCheckboxChange}
          size="small"
          aria-describedby={`definition-${id}-description`}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <label
          htmlFor={`definition-${id}`}
          className="block typography-body-text text-neutral-dark-1 cursor-pointer truncate"
          id={`definition-${id}-description`}
        >
          {name}
        </label>
      </div>

      {/* Status Badge */}
      <div className="flex-shrink-0">
        <Badge 
          label={statusInfo.label} 
          intent={statusInfo.intent}
          aria-label={`Status: ${statusInfo.label}`}
        />
      </div>

      {/* Action Buttons */}
      {(isHovered || isSelected) && (
        <div className="flex-shrink-0 flex items-center gap-1">
          <button
            onClick={() => handleAction('view')}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-neutral-7 text-neutral-1 hover:text-neutral-0 transition-colors duration-200 focus-ring"
            aria-label={`View ${name} definition`}
            title="View definition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
          <button
            onClick={() => handleAction('edit')}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-neutral-7 text-neutral-1 hover:text-neutral-0 transition-colors duration-200 focus-ring"
            aria-label={`Edit ${name} definition`}
            title="Edit definition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default DefinitionItem;