import { useState, useRef, type KeyboardEvent } from 'react';
import Icon from './Icon';

export interface TagData {
  id: string;
  label: string;
}

interface TagProps {
  label: string;
  onRemove?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'removable';
  state?: 'normal' | 'hover' | 'active' | 'focus' | 'selected';
  className?: string;
}

interface TagInputProps {
  label?: string;
  helperText?: string;
  placeholder?: string;
  tags: TagData[];
  onTagsChange: (tags: TagData[]) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  maxTags?: number;
  className?: string;
}

function Tag({ 
  label, 
  onRemove, 
  disabled = false, 
  variant = 'default',
  state = 'normal',
  className = '' 
}: TagProps) {
  const getTagClasses = () => {
    const baseClasses = 'inline-flex items-center gap-1 px-2 py-1 rounded text-sm font-medium transition-colors duration-200';
    
    if (disabled) {
      return `${baseClasses} bg-neutral-6 text-neutral-2 cursor-not-allowed`;
    }

    switch (state) {
      case 'hover':
        return `${baseClasses} bg-neutral-5 text-neutral-0 cursor-pointer`;
      case 'active':
        return `${baseClasses} bg-neutral-4 text-neutral-0 cursor-pointer`;
      case 'focus':
        return `${baseClasses} bg-neutral-6 text-neutral-0 focus-ring`;
      case 'selected':
        return `${baseClasses} bg-dark-blue-3 text-dark-blue-0 border border-dark-blue-1`;
      default:
        return `${baseClasses} bg-neutral-6 text-neutral-0`;
    }
  };

  if (variant === 'removable' && onRemove) {
    return (
      <span className={`${getTagClasses()} ${className}`}>
        <span>{label}</span>
        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          className="ml-1 p-0.5 rounded hover:bg-white-a-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-dark-blue-0 transition-colors duration-200"
          aria-label={`Remove ${label} tag`}
        >
          <Icon type="close" size="small" decorative />
        </button>
      </span>
    );
  }

  return (
    <span className={`${getTagClasses()} ${className}`}>
      {label}
    </span>
  );
}

function TagInput({
  label,
  helperText,
  placeholder = "Type and press Enter to add tags",
  tags,
  onTagsChange,
  disabled = false,
  error = false,
  errorMessage,
  maxTags,
  className = ''
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [temporaryMessage, setTemporaryMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Check if we're at the max limit
  const isAtMaxLimit = maxTags ? tags.length >= maxTags : false;

  const addTag = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;
    
    // Check if tag already exists
    if (tags.some(tag => tag.label.toLowerCase() === trimmedValue.toLowerCase())) {
      showTemporaryMessage('Tag already exists');
      return;
    }

    // Check max tags limit
    if (maxTags && tags.length >= maxTags) {
      showTemporaryMessage(`Maximum ${maxTags} tags reached`);
      return;
    }

    const newTag: TagData = {
      id: `tag-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      label: trimmedValue
    };

    onTagsChange([...tags, newTag]);
    setInputValue('');
  };

  const showTemporaryMessage = (message: string) => {
    setTemporaryMessage(message);
    setTimeout(() => {
      setTemporaryMessage(null);
    }, 3000);
  };

  const removeTag = (tagId: string) => {
    onTagsChange(tags.filter(tag => tag.id !== tagId));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove last tag if input is empty and backspace is pressed
      const lastTag = tags[tags.length - 1];
      removeTag(lastTag.id);
    }
  };

  const containerClasses = error 
    ? 'border border-red-0 rounded focus-within:ring-2 focus-within:ring-red-0 focus-within:ring-offset-1'
    : isAtMaxLimit 
      ? 'border border-yellow-0 rounded focus-within:ring-2 focus-within:ring-yellow-0 focus-within:ring-offset-1'
      : 'border border-neutral-3 rounded focus-within:ring-2 focus-within:ring-dark-blue-0 focus-within:ring-offset-1';

  return (
    <div className={`${className}`}>
      {label && (
        <label className="block typography-label text-neutral-0 mb-1">
          {label}
        </label>
      )}
      
      <div className={`${containerClasses} ${disabled ? 'bg-neutral-7 cursor-not-allowed' : 'bg-white'} transition-all duration-200`}>
        <div className="flex flex-wrap gap-1 p-2">
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              label={tag.label}
              variant="removable"
              onRemove={() => removeTag(tag.id)}
              disabled={disabled}
            />
          ))}
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isAtMaxLimit 
                ? maxTags ? `Maximum ${maxTags} tags reached` : placeholder
                : tags.length === 0 ? placeholder : ''
            }
            disabled={disabled}
            className="flex-1 min-w-[120px] border-none outline-none bg-transparent typography-body-text placeholder:text-neutral-2 disabled:cursor-not-allowed"
            aria-describedby={
              error && errorMessage ? `${label}-error` : 
              helperText ? `${label}-helper` : undefined
            }
          />
        </div>
      </div>

      {error && errorMessage && (
        <div className="flex items-center gap-1 mt-1" id={`${label}-error`}>
          <Icon type="warning" size="small" className="text-red-0" alt="Error" />
          <span className="typography-label-helper text-red-0">{errorMessage}</span>
        </div>
      )}

      {/* Temporary message for failures */}
      {temporaryMessage && (
        <div className="flex items-center gap-1 mt-1" role="alert" aria-live="polite">
          <Icon type="warning" size="small" className="text-yellow-0" alt="Warning" />
          <span className="typography-label-helper text-yellow-0">{temporaryMessage}</span>
        </div>
      )}

      {!error && !temporaryMessage && helperText && (
        <p className={`typography-label-helper mt-1 ${
          isAtMaxLimit ? 'text-yellow-0' : 'text-neutral-1'
        }`} id={`${label}-helper`}>
          {isAtMaxLimit && maxTags ? `Maximum ${maxTags} tags reached` : helperText}
        </p>
      )}
    </div>
  );
}

export { Tag, TagInput };
export type { TagProps, TagInputProps };