import { useState } from 'react';
import Dialog from './Dialog';
import Input from './Input';
import Select, { type SelectOption } from './Select';
import Button from './Button';
import Icon from './Icon';
import Textarea from './Textarea';

/**
 * Props for the DefinitionDialog component
 */
export interface DefinitionDialogProps {
  /**
   * Whether the dialog is open
   */
  open: boolean;
  
  /**
   * Callback when dialog should close
   */
  onClose: () => void;
  
  /**
   * Callback when definition is saved
   */
  onSave?: (data: DefinitionData) => void;
  
  /**
   * Callback when definition is inserted
   */
  onInsert?: (data: DefinitionData) => void;
}

/**
 * Definition data structure
 */
export interface DefinitionData {
  search: string;
  keyword: string;
  location: string;
  position: 'before' | 'after';
  selectedOption: string;
  definition: string;
}

/**
 * Sample data for the dropdowns
 */
const keywordOptions: SelectOption[] = [
  { value: 'means', label: 'means' },
  { value: 'includes', label: 'includes' },
  { value: 'refers-to', label: 'refers to' },
  { value: 'shall-mean', label: 'shall mean' }
];

const locationOptions: SelectOption[] = [
  { 
    value: 'clause-6', 
    label: 'Clause 6',
    description: '6. UTILISATION - LETTERS OF CREDIT'
  },
  { value: 'clause-1', label: 'Clause 1', description: '1. DEFINITIONS' },
  { value: 'clause-2', label: 'Clause 2', description: '2. FACILITY' },
  { value: 'clause-3', label: 'Clause 3', description: '3. PURPOSE' },
  { value: 'clause-4', label: 'Clause 4', description: '4. CONDITIONS' },
  { value: 'clause-5', label: 'Clause 5', description: '5. DRAWINGS' }
];

const exchangeRateOptions: SelectOption[] = [
  { value: 'agents-spot-rate', label: "Agent's Spot Rate of Exchange" },
  { value: 'market-rate', label: 'Market Rate of Exchange' },
  { value: 'fixed-rate', label: 'Fixed Rate of Exchange' },
  { value: 'floating-rate', label: 'Floating Rate of Exchange' }
];

/**
 * Complex dialog for inserting definitions, matching the provided screenshot
 */
export function DefinitionDialog({
  open,
  onClose,
  onSave,
  onInsert
}: DefinitionDialogProps) {
  const [formData, setFormData] = useState<DefinitionData>({
    search: '',
    keyword: 'means',
    location: 'clause-6',
    position: 'before',
    selectedOption: 'agents-spot-rate',
    definition: 'Acceptable Bank: means'
  });

  const [isFormatting, setIsFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    quote: false
  });

  const handleSave = () => {
    onSave?.(formData);
  };

  const handleInsert = () => {
    onInsert?.(formData);
    onClose();
  };

  const toggleFormat = (format: keyof typeof isFormatting) => {
    setIsFormatting(prev => ({
      ...prev,
      [format]: !prev[format]
    }));
  };

  const formatButtons = [
    { key: 'bold' as const, icon: 'format-bold', title: 'Bold' },
    { key: 'italic' as const, icon: 'format-italic', title: 'Italic' },
    { key: 'underline' as const, icon: 'format-underline', title: 'Underline' },
    { key: 'quote' as const, icon: 'quotes', title: 'Quote' }
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Acceptable Bank"
      size="large"
      className="max-h-[90vh] overflow-hidden flex flex-col"
      footer={
        <div className="flex items-center gap-3">
          <Button
            label="Save & View Section"
            type="ghost"
            appearance="secondary"
            onClick={handleSave}
          />
          <Button
            label="Insert Definition"
            appearance="primary"
            onClick={handleInsert}
          />
        </div>
      }
    >
      <div className="space-y-6 overflow-y-auto">
        {/* Search Input */}
        <Input
          id="search"
          placeholder="Search definitions"
          value={formData.search}
          onChange={(e) => setFormData(prev => ({ ...prev, search: e.target.value }))}
          beforeIcon={<Icon type="search" size="medium" />}
        />

        {/* Keyword Selection */}
        <div>
          <label className="block typography-label text-neutral-0 mb-2">
            Keyword
          </label>
          <Select
            options={keywordOptions}
            value={formData.keyword}
            onChange={(value) => setFormData(prev => ({ ...prev, keyword: value as string }))}
            placeholder="Select keyword"
            size="medium"
          />
        </div>

        {/* Location Selection */}
        <div>
          <label className="block typography-label text-neutral-0 mb-2">
            Choose location
          </label>
          <Select
            options={locationOptions}
            value={formData.location}
            onChange={(value) => setFormData(prev => ({ ...prev, location: value as string }))}
            placeholder="Select location"
            size="medium"
          />
        </div>

        {/* Insert Definition Position */}
        <div>
          <label className="block typography-label text-neutral-0 mb-3">
            Insert Definition Position
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="position"
                value="before"
                checked={formData.position === 'before'}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value as 'before' | 'after' }))}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-2 transition-colors duration-200 ${
                formData.position === 'before' 
                  ? 'border-dark-blue-0 bg-dark-blue-0' 
                  : 'border-night-sky-blue-2 bg-white'
              }`}>
                {formData.position === 'before' && (
                  <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                )}
              </div>
              <span className="typography-body-text text-neutral-0">Before</span>
            </label>
            
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="position"
                value="after"
                checked={formData.position === 'after'}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value as 'before' | 'after' }))}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-2 transition-colors duration-200 ${
                formData.position === 'after' 
                  ? 'border-dark-blue-0 bg-dark-blue-0' 
                  : 'border-night-sky-blue-2 bg-white'
              }`}>
                {formData.position === 'after' && (
                  <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                )}
              </div>
              <span className="typography-body-text text-neutral-0">After</span>
            </label>
          </div>
        </div>

        {/* Select Dropdown */}
        <div>
          <Select
            options={exchangeRateOptions}
            value={formData.selectedOption}
            onChange={(value) => setFormData(prev => ({ ...prev, selectedOption: value as string }))}
            placeholder="Select option"
            size="medium"
          />
        </div>

        {/* Definition Text Area */}
        <div>
          <label className="block typography-label text-neutral-0 mb-2">
            Definition
          </label>
          
          {/* Formatting Toolbar */}
          <div className="flex items-center gap-1 p-2 border border-night-sky-blue-3 rounded-t-md bg-night-sky-blue-8">
            {formatButtons.map(({ key, icon, title }) => (
              <button
                key={key}
                type="button"
                onClick={() => toggleFormat(key)}
                title={title}
                className={`
                  w-8 h-8 flex items-center justify-center rounded
                  transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 
                  focus-visible:ring-dark-blue-0 focus-visible:ring-offset-1
                  ${isFormatting[key] 
                    ? 'bg-dark-blue-0 text-white' 
                    : 'text-neutral-0 hover:bg-night-sky-blue-6'
                  }
                `}
              >
                <Icon 
                  type={icon as 'format-bold' | 'format-italic' | 'format-underline' | 'quotes'} 
                  size="small" 
                  className={isFormatting[key] ? 'text-white' : 'text-neutral-0'}
                />
              </button>
            ))}
          </div>
          
          {/* Text Area */}
          <Textarea
            id="definition"
            value={formData.definition}
            onChange={(e) => setFormData(prev => ({ ...prev, definition: e.target.value }))}
            placeholder="Enter definition..."
            rows={4}
            resize="none"
            className="rounded-t-none border-t-0"
          />
        </div>
      </div>
    </Dialog>
  );
}

export default DefinitionDialog;