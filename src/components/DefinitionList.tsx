import { useState } from 'react';
import { type DefinitionStatus } from './DefinitionItem';
import DefinitionDetail from './DefinitionDetail';
import { Checkbox } from './Checkbox';
import { Button } from './Button';

export interface Definition {
  id: string;
  name: string;
  status: DefinitionStatus;
  hasDetails?: boolean;
  occurrenceCount?: number;
  message?: string;
  occurrences?: Array<{
    id: string;
    title: string;
    items: Array<{
      id: string;
      text: string;
      context?: string;
      location?: string;
    }>;
  }>;
  actions?: Array<{
    id: string;
    label: string;
    type: 'primary' | 'secondary';
    onClick: () => void;
  }>;
}

export interface DefinitionListProps {
  definitions: Definition[];
  selectedIds?: string[];
  expandedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  onExpandChange?: (expandedIds: string[]) => void;
  onAction?: (id: string, action: 'edit' | 'view') => void;
  onOccurrenceClick?: (definitionId: string, occurrenceId: string) => void;
  showSelectAll?: boolean;
  emptyStateMessage?: string;
  className?: string;
}

interface DefinitionListHeaderProps {
  totalCount: number;
  selectedCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  isAllSelected: boolean;
  showSelectAll: boolean;
}

function DefinitionListHeader({
  totalCount,
  selectedCount,
  onSelectAll,
  onDeselectAll,
  isAllSelected,
  showSelectAll,
}: DefinitionListHeaderProps) {
  if (!showSelectAll) return null;

  return (
    <div className="flex items-center justify-between p-3 border-b border-neutral-4 bg-neutral-8">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={isAllSelected}
          indeterminate={selectedCount > 0 && selectedCount < totalCount}
          onChange={isAllSelected ? onDeselectAll : onSelectAll}
          size="small"
          aria-label={isAllSelected ? 'Deselect all definitions' : 'Select all definitions'}
        />
        <span className="typography-label text-neutral-dark-1">
          {selectedCount > 0 ? `${selectedCount} of ${totalCount} selected` : `${totalCount} definitions`}
        </span>
      </div>
      
      {selectedCount > 0 && (
        <div className="flex items-center gap-2">
          {isAllSelected ? (
            // When all items are selected, show Export and Hide actions
            <>
              <Button
                label="Export"
                appearance="primary"
                size="small"
                onClick={() => {
                  // TODO: Implement export functionality
                  console.log('Export all selected items');
                }}
              />
              <Button
                label="Hide"
                appearance="secondary"
                size="small"
                onClick={() => {
                  // TODO: Implement hide functionality
                  console.log('Hide all selected items');
                }}
              />
            </>
          ) : (
            // When partial selection, show Clear selection
            <button
              onClick={onDeselectAll}
              className="px-3 py-1 text-sm text-neutral-1 hover:text-neutral-0 hover:bg-neutral-7 rounded transition-colors duration-200 focus-ring"
            >
              Clear selection
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function DefinitionList({
  definitions,
  selectedIds = [],
  expandedIds = [],
  onSelectionChange,
  onExpandChange,
  onAction: _, // eslint-disable-line @typescript-eslint/no-unused-vars
  onOccurrenceClick,
  showSelectAll = true,
  emptyStateMessage = 'No definitions found.',
  className = '',
}: DefinitionListProps) {
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>(selectedIds);
  const [internalExpandedIds, setInternalExpandedIds] = useState<string[]>(expandedIds);
  
  const currentSelectedIds = onSelectionChange ? selectedIds : internalSelectedIds;
  const setSelectedIds = onSelectionChange || setInternalSelectedIds;
  
  const currentExpandedIds = onExpandChange ? expandedIds : internalExpandedIds;
  const setExpandedIds = onExpandChange || setInternalExpandedIds;

  const handleItemSelectionChange = (id: string, selected: boolean) => {
    const newSelectedIds = selected
      ? [...currentSelectedIds, id]
      : currentSelectedIds.filter(selectedId => selectedId !== id);
    
    setSelectedIds(newSelectedIds);
  };

  const handleSelectAll = () => {
    const allIds = definitions.map(def => def.id);
    setSelectedIds(allIds);
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  const handleExpandToggle = (id: string, expanded: boolean) => {
    const newExpandedIds = expanded
      ? [...currentExpandedIds, id]
      : currentExpandedIds.filter(expandedId => expandedId !== id);
    
    setExpandedIds(newExpandedIds);
  };

  const handleOccurrenceClick = (definitionId: string, occurrenceId: string) => {
    onOccurrenceClick?.(definitionId, occurrenceId);
  };

  const isAllSelected = definitions.length > 0 && currentSelectedIds.length === definitions.length;
  const selectedCount = currentSelectedIds.length;

  if (definitions.length === 0) {
    return (
      <div className={`border border-neutral-4 rounded bg-white ${className}`}>
        <div className="flex items-center justify-center p-8 text-center">
          <div>
            <div className="w-12 h-12 mx-auto mb-4 bg-neutral-7 rounded flex items-center justify-center">
              <svg
                className="w-6 h-6 text-neutral-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="typography-body-text text-neutral-1">{emptyStateMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`border border-neutral-4 rounded bg-white overflow-hidden ${className}`}>
      <DefinitionListHeader
        totalCount={definitions.length}
        selectedCount={selectedCount}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        isAllSelected={isAllSelected}
        showSelectAll={showSelectAll}
      />
      
      <div className="divide-y divide-neutral-4">
        {definitions.map((definition) => {
          const isExpanded = currentExpandedIds.includes(definition.id);
          
          return (
            <div key={definition.id}>
              <DefinitionDetail
                id={definition.id}
                name={definition.name}
                status={definition.status}
                isSelected={currentSelectedIds.includes(definition.id)}
                isExpanded={isExpanded}
                occurrenceCount={definition.occurrenceCount}
                occurrences={definition.occurrences}
                message={definition.message}
                actions={definition.actions}
                onSelectionChange={handleItemSelectionChange}
                onExpandToggle={handleExpandToggle}
                onOccurrenceClick={(occurrenceId) => 
                  handleOccurrenceClick(definition.id, occurrenceId)
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DefinitionList;