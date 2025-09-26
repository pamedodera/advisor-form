import React, { useState, useRef, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import { FirmService } from '../services/FirmService';

interface FirmInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (firmName: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  label?: string;
  helperText?: string;
}

export function FirmInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Enter law firm name...",
  error,
  disabled = false,
  label,
  helperText
}: FirmInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length >= 3) {
      const firmSuggestions = FirmService.getFirmSuggestions(value, 8);
      setSuggestions(firmSuggestions);
      // Only show suggestions if we're not currently showing any (avoids showing after selection)
      if (!showSuggestions) {
        setShowSuggestions(firmSuggestions.length > 0);
      }
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    // Show suggestions when user starts typing
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (value.trim()) {
          onSubmit(value.trim());
        }
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else if (value.trim()) {
          onSubmit(value.trim());
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
      case 'Tab':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      if (
        !suggestionsRef.current?.contains(document.activeElement) &&
        document.activeElement !== inputRef.current
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    }, 150);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0 && value.length >= 2) {
      setShowSuggestions(true);
    }
  };

  const handleSubmitClick = () => {
    if (value.trim()) {
      onSubmit(value.trim());
    }
  };

  return (
    <div className="relative">
      <div className="space-y-4">
        <div className="relative">
          <Input
            ref={inputRef}
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            error={error}
            disabled={disabled}
            size="large"
            className="relative z-10"
            autoComplete="off"
            label={label}
            helperText={helperText}
          />

          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-20 left-0 right-0 mt-1 bg-white border border-night-sky-blue-3 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  type="button"
                  className={`w-full px-4 py-3 text-left hover:bg-night-sky-blue-7 focus:bg-night-sky-blue-7 focus:outline-none border-b border-night-sky-blue-5 last:border-b-0 ${
                    index === selectedIndex ? 'bg-night-sky-blue-7' : ''
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          appearance="primary"
          size="large"
          onClick={handleSubmitClick}
          disabled={disabled || !value.trim()}
          className="w-full"
        >
          Add Firm
        </Button>
      </div>
    </div>
  );
}

export default FirmInput;