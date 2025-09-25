import ButtonGroup from './ButtonGroup';
import Disclosure from './Disclosure';
import Icon from './Icon';

export interface OccurrenceItemProps {
  id: string;
  title: string;
  occurrences: Array<{
    id: string;
    text: string;
    context?: string;
    location?: string;
  }>;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onOccurrenceClick?: (occurrenceId: string) => void;
  isExpanded?: boolean;
  className?: string;
}

export function OccurrenceItem({
  id: _id, // eslint-disable-line @typescript-eslint/no-unused-vars
  title,
  occurrences,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onOccurrenceClick,
  isExpanded = false,
  className = '',
}: OccurrenceItemProps) {
  const handleOccurrenceClick = (occurrenceId: string) => {
    onOccurrenceClick?.(occurrenceId);
  };

  const generatePaginationItems = () => {
    if (totalPages <= 1) return [];

    const items = [];
    
    // Previous button
    if (currentPage > 1) {
      items.push({
        beforeIcon: <Icon type="caret-left" size="small" />,
        onClick: () => onPageChange?.(currentPage - 1),
        'aria-label': 'Previous page',
      });
    }

    // Page numbers (simplified - show current and adjacent)
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let page = startPage; page <= endPage; page++) {
      items.push({
        label: page.toString(),
        onClick: () => onPageChange?.(page),
        className: page === currentPage ? 'bg-dark-blue-0 text-white' : '',
        'aria-label': `Go to page ${page}`,
        'aria-current': page === currentPage ? 'page' : undefined,
      });
    }

    // Next button
    if (currentPage < totalPages) {
      items.push({
        beforeIcon: <Icon type="caret-right" size="small" />,
        onClick: () => onPageChange?.(currentPage + 1),
        'aria-label': 'Next page',
      });
    }

    return items;
  };

  const paginationItems = generatePaginationItems();

  return (
    <div className={`bg-neutral-8 border border-neutral-4 rounded-md ${className}`}>
      <Disclosure
        trigger={title}
        defaultOpen={isExpanded}
        variant="ghost"
        size="small"
        beforeIcon={<Icon type="file" size="small" />}
        className="bg-transparent"
        triggerClassName="px-4 py-3 hover:bg-neutral-7"
        panelClassName="px-0 py-0"
      >
        <div className="border-t border-neutral-4">
          {/* Pagination Controls */}
          {paginationItems.length > 0 && (
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-7 border-b border-neutral-4">
              <span className="typography-body-text-sm text-neutral-1">
                Page {currentPage} of {totalPages}
              </span>
              <ButtonGroup 
                items={paginationItems}
                size="small"
              />
            </div>
          )}

          {/* Occurrences List */}
          <div className="divide-y divide-neutral-4">
            {occurrences.map((occurrence) => (
              <div
                key={occurrence.id}
                className="px-4 py-3 hover:bg-neutral-7 cursor-pointer transition-colors duration-200"
                onClick={() => handleOccurrenceClick(occurrence.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOccurrenceClick(occurrence.id);
                  }
                }}
                aria-label={`Navigate to occurrence: ${occurrence.text}`}
              >
                <div className="flex items-start gap-3">
                  {/* Navigation Icon */}
                  <div className="flex-shrink-0 mt-1">
                    <Icon 
                      type="arrow-external" 
                      size="small" 
                      className="text-neutral-2 hover:text-neutral-0 transition-colors" 
                    />
                  </div>

                  {/* Occurrence Content */}
                  <div className="flex-1 min-w-0">
                    <div className="typography-body-text text-neutral-dark-1 mb-1">
                      {occurrence.text}
                    </div>
                    
                    {occurrence.context && (
                      <div className="typography-body-text-sm text-neutral-1 truncate">
                        {occurrence.context}
                      </div>
                    )}
                    
                    {occurrence.location && (
                      <div className="typography-body-text-sm text-neutral-2 mt-1">
                        {occurrence.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {occurrences.length === 0 && (
            <div className="px-4 py-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-neutral-6 rounded-lg flex items-center justify-center">
                <Icon type="search" size="medium" className="text-neutral-2" />
              </div>
              <p className="typography-body-text text-neutral-1">
                No occurrences found
              </p>
            </div>
          )}
        </div>
      </Disclosure>
    </div>
  );
}

export default OccurrenceItem;