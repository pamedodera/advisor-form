import { useState } from 'react';
import { Tabs } from '../Tabs';
import { Input } from '../Input';
import { Button } from '../Button';
import ButtonGroup from '../ButtonGroup';
import DefinitionList, { type Definition } from '../DefinitionList';
import Icon from '../Icon';
import ResizeHandle from '../ResizeHandle';

export interface DocumentDefinitionInterfaceProps {
  width?: number;
  onResize?: (newWidth: number) => void;
  isResizable?: boolean;
  onDefinitionAction?: (id: string, action: 'edit' | 'view') => void;
  onOccurrenceClick?: (definitionId: string, occurrenceId: string) => void;
  className?: string;
}

interface StatusCount {
  all: number;
  defined: number;
  undefined: number;
  unused: number;
}

export function DocumentDefinitionInterface({
  width = 600,
  onResize,
  isResizable = true,
  onDefinitionAction,
  onOccurrenceClick,
  className = '',
}: DocumentDefinitionInterfaceProps) {
  const [selectedTab, setSelectedTab] = useState('draft');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showHidden, setShowHidden] = useState(false);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [selectedDefinitions, setSelectedDefinitions] = useState<string[]>([]);
  const [expandedDefinitions, setExpandedDefinitions] = useState<string[]>(['2']);

  // Mock data matching the Figma design
  const mockDefinitions: Definition[] = [
    {
      id: '1',
      name: 'Ancillary Lender',
      status: 'inline',
      hasDetails: true,
    },
    {
      id: '2',
      name: 'New Lender',
      status: 'undefined',
      hasDetails: true,
      occurrenceCount: 3,
      message: 'Definition not found',
      actions: [
        { id: 'insert', label: 'Insert', type: 'primary', onClick: () => console.log('Insert') },
        { id: 'replace', label: 'Replace', type: 'secondary', onClick: () => console.log('Replace') },
        { id: 'hide', label: 'Hide', type: 'secondary', onClick: () => console.log('Hide') },
      ],
      occurrences: [
        {
          id: 'doc1',
          title: '7. Other Documents and Evidence',
          items: [
            {
              id: 'occ1',
              text: 'Subject to the terms of this Agreement, an Affiliate of a New Lender may become...',
              context: 'Section 7.1 - Primary Documentation',
              location: 'Page 15, Line 23',
            },
          ],
        },
        {
          id: 'doc2', 
          title: '5. Other Documents and Evidence',
          items: [
            {
              id: 'occ2',
              text: 'Each New Lender shall provide documentation as specified...',
              context: 'Section 5.2 - Supporting Evidence',
              location: 'Page 8, Line 12',
            },
          ],
        },
        {
          id: 'doc3',
          title: '3. Additional Documentation',
          items: [
            {
              id: 'occ3',
              text: 'Any New Lender entering into this Agreement must satisfy all requirements...',
              context: 'Section 3.4 - Compliance Requirements',
              location: 'Page 5, Line 8',
            },
          ],
        },
      ],
    },
    {
      id: '3',
      name: 'Existing Lender',
      status: 'inline',
      hasDetails: true,
    },
    {
      id: '4',
      name: 'Increase Lender',
      status: 'inline',
      hasDetails: true,
    },
    {
      id: '5',
      name: 'Non-Acceptable L/C Lender',
      status: 'inline',
      hasDetails: true,
    },
    {
      id: '6',
      name: 'Majority Lender',
      status: 'listed',
      hasDetails: true,
    },
    {
      id: '7',
      name: 'Accession Deed',
      status: 'inline',
      hasDetails: true,
    },
  ];

  // Calculate status counts
  const statusCounts: StatusCount = mockDefinitions.reduce(
    (acc, def) => {
      acc.all++;
      switch (def.status) {
        case 'inline':
        case 'listed':
          acc.defined++;
          break;
        case 'undefined':
          acc.undefined++;
          break;
        case 'unused':
          acc.unused++;
          break;
      }
      return acc;
    },
    { all: 0, defined: 0, undefined: 0, unused: 0 }
  );

  // Filter definitions based on selected filter
  const filteredDefinitions = mockDefinitions.filter((def) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'defined') return def.status === 'inline' || def.status === 'listed';
    if (selectedFilter === 'undefined') return def.status === 'undefined';
    if (selectedFilter === 'unused') return def.status === 'unused';
    return true;
  });

  const mainTabs = [
    { id: 'vault', label: 'Vault', content: <div /> },
    { id: 'draft', label: 'Draft', content: <div /> },
    { id: 'proof', label: 'Proof', content: <div /> },
    { id: 'enhance', label: 'Enhance', content: <div /> },
    { id: 'cascade', label: 'Cascade', content: <div /> },
    { id: 'pdf', label: 'PDF', content: <div /> },
  ];

  const filterItems = [
    { 
      label: `All ${statusCounts.all}`, 
      onClick: () => setSelectedFilter('all'),
      className: selectedFilter === 'all' ? 'bg-neutral-6 text-neutral-dark-1' : '',
    },
    { 
      label: `Defined ${statusCounts.defined}`, 
      onClick: () => setSelectedFilter('defined'),
      className: selectedFilter === 'defined' ? 'bg-neutral-6 text-neutral-dark-1' : '',
    },
    { 
      label: `Undefined ${statusCounts.undefined}`, 
      onClick: () => setSelectedFilter('undefined'),
      className: selectedFilter === 'undefined' ? 'bg-neutral-6 text-neutral-dark-1' : '',
    },
    { 
      label: `Unused ${statusCounts.unused}`, 
      onClick: () => setSelectedFilter('unused'),
      className: selectedFilter === 'unused' ? 'bg-neutral-6 text-neutral-dark-1' : '',
    },
  ];

  return (
    <div className={`flex h-[80vh] bg-neutral-7 ${className}`}>
      {/* Main Panel */}
      <div
        className="flex flex-col bg-white border-r border-neutral-3 shadow-lg"
        style={{ width: `${width}px` }}
      >
        {/* Header with Main Navigation */}
        <div className="pt-3">
          <Tabs
            tabs={mainTabs}
            defaultTab={selectedTab}
            onChange={setSelectedTab}
            variant="underline"
            size="small"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 bg-white pt-3">
          <Tabs
            tabs={[
              {
                id: 'definitions',
                label: 'Definitions',
                content: <div />, // Content will be handled outside tabs
                beforeIcon: <Icon type="expand-window" size="small" />,
              },
              {
                id: 'references',
                label: 'References',
                content: <div />,
                beforeIcon: <Icon type="expand-window" size="small" />,
              },
              {
                id: 'link-docs',
                label: 'Link Docs',
                content: <div />,
                beforeIcon: <Icon type="expand-window" size="small" />,
              },
            ]}
            defaultTab="definitions"
            size="small"
            variant="pills"
          />
        </div>

        {/* Global Search */}
        <div className="px-4 py-3 border-b border-neutral-4 bg-white">
          <Input
            placeholder="Global Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="medium"
            beforeIcon={<Icon type="global-search" size="small" />}
            className="w-full"
          />
        </div>

        {/* Filter Buttons */}
        <div className="px-4 py-3 border-b border-neutral-4 bg-white">
          <ButtonGroup
            items={filterItems}
            size="small"
            className="w-full"
          />
        </div>

        {/* Action Bar */}
        <div className="px-4 py-3 border-b border-neutral-4 bg-neutral-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                beforeIcon={<Icon type={showHidden ? "show" : "hide"} size="small" />}
                label="Hidden"
                appearance="secondary"
                size="small"
                type="ghost"
                onClick={() => setShowHidden(!showHidden)}
                className={showHidden ? 'bg-neutral-6' : ''}
              />
              <Button
                beforeIcon={<Icon type={showBookmarked ? "bookmark-filled" : "bookmark"} size="small" />}
                label="Bookmarked"
                appearance="secondary"
                size="small"
                type="ghost"
                onClick={() => setShowBookmarked(!showBookmarked)}
                className={showBookmarked ? 'bg-neutral-6' : ''}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="typography-body-text-sm text-neutral-1">Name</span>
              <Icon type="caret-down" size="small" className="text-neutral-1" />
            </div>
          </div>
        </div>

        {/* Content Area - Definition List */}
        <div className="flex-1 overflow-y-auto">
          <DefinitionList
            definitions={filteredDefinitions}
            selectedIds={selectedDefinitions}
            expandedIds={expandedDefinitions}
            onSelectionChange={setSelectedDefinitions}
            onExpandChange={setExpandedDefinitions}
            onAction={onDefinitionAction}
            onOccurrenceClick={onOccurrenceClick}
            showSelectAll={true}
            emptyStateMessage={selectedFilter === 'unused' ? 'No unused definitions found' : 'No definitions found.'}
            className="border-0 rounded-none"
          />
        </div>
      </div>

      {/* Resize Handle */}
      {isResizable && onResize && (
        <ResizeHandle onResize={onResize} minWidth={420} maxWidth={800} />
      )}
    </div>
  );
}

export default DocumentDefinitionInterface;